import type { GameState, Rules } from './types';
import { clone } from './actions';
import { desertions, foodConsumed, foodProduced, income, ownedRegions, recurringMoney, upkeep } from './formulas';

/** Dilemma data shape, matching `src/data/dilemmas.json`. */
export interface DilemmaEffects {
  money?: number;
  influence?: number;
  reputation?: number;
  capitalArmy?: number;
  capitalPop?: number;
  upkeepOverTurns?: { money: number; turns: number };
}
export interface Dilemma {
  id: string;
  title: string;
  text: string;
  options: { id: string; label: string; effects: DilemmaEffects }[];
}

/** The id of the default option applied when a dilemma is ignored. */
export const IGNORE_OPTION = 'ignorar';

/** Deterministic dilemma for a player turn: rotates by turn and seat. */
export function dilemmaFor(state: GameState, dilemmas: Dilemma[]): Dilemma {
  return dilemmas[(state.turn - 1 + state.current) % dilemmas.length];
}

/** Mark elimination of a player who holds no region. Mutates `state`. Returns log text. */
export function checkElimination(state: GameState, player: number): string[] {
  const p = state.players[player];
  if (p.eliminated || ownedRegions(state, player).length > 0) return [];
  p.eliminated = true;
  state.treaties = state.treaties.filter((t) => t.a !== player && t.b !== player);
  return [`${p.name} perdeu todas as cidades e sai da partida.`];
}

function capitalOrFirst(state: GameState, player: number) {
  const owned = ownedRegions(state, player);
  return owned.find((r) => r.capitalOf === player) ?? owned[0];
}

/**
 * Resolve the current player's dilemma with one option. Never blocks actions.
 * Returns the input state unchanged if the dilemma was already resolved.
 */
export function chooseDilemma(input: GameState, dilemma: Dilemma, optionId: string, rules: Rules): GameState {
  if (input.dilemma?.resolved) return input;
  const opt = dilemma.options.find((o) => o.id === optionId) ?? dilemma.options.find((o) => o.id === IGNORE_OPTION)!;
  const state = clone(input);
  const p = state.players[state.current];
  const e = opt.effects;
  if (e.money) p.money = Math.max(0, p.money + e.money);
  if (e.influence) p.influence = Math.min(rules.caps.influence, Math.max(0, p.influence + e.influence));
  if (e.reputation) p.reputation += e.reputation;
  const cap = capitalOrFirst(state, p.id);
  if (cap && e.capitalArmy) cap.army += e.capitalArmy;
  if (cap && e.capitalPop) cap.pop = Math.min(rules.caps.pop, Math.max(rules.battle.minPop, cap.pop + e.capitalPop));
  if (e.upkeepOverTurns) {
    p.recurring.push({ money: e.upkeepOverTurns.money, turnsLeft: e.upkeepOverTurns.turns, label: dilemma.title });
  }
  state.dilemma = { dilemmaId: dilemma.id, resolved: true };
  state.log.push({ turn: state.turn, player: p.id, text: `${p.name} — ${dilemma.title}: ${opt.label}` });
  return state;
}

/** One line of the turn report. */
export interface ReportLine {
  label: string;
  value: number;
}

/** Economy step for the current player (phase 4). Mutates `state`. Returns report lines. */
export function runEconomy(state: GameState, rules: Rules): ReportLine[] {
  const me = state.current;
  const p = state.players[me];
  const lines: ReportLine[] = [];

  const inc = income(state, me, rules);
  const rec = recurringMoney(p);
  p.money = Math.max(0, p.money + inc + rec);
  lines.push({ label: 'Renda', value: inc });
  if (rec) lines.push({ label: 'Pagamentos recorrentes', value: rec });
  p.recurring = p.recurring.map((r) => ({ ...r, turnsLeft: r.turnsLeft - 1 })).filter((r) => r.turnsLeft > 0);

  const up = upkeep(state, me, rules);
  lines.push({ label: 'Manutenção', value: -up });
  if (up <= p.money) {
    p.money -= up;
  } else {
    const missing = up - p.money;
    p.money = 0;
    let gone = desertions(missing, rules);
    lines.push({ label: 'Desertores', value: -gone });
    const regions = ownedRegions(state, me).sort((a, b) => b.army - a.army);
    while (gone > 0 && regions.some((r) => r.army > 0)) {
      const r = regions.find((x) => x.army > 1) ?? regions.find((x) => x.army > 0)!;
      r.army -= 1;
      gone -= 1;
      regions.sort((a, b) => b.army - a.army);
    }
  }

  let popLost = 0;
  let popGained = 0;
  for (const r of ownedRegions(state, me)) {
    if (foodProduced(r, p, rules) < foodConsumed(r, rules) && r.pop > rules.battle.minPop) {
      r.pop = Math.max(rules.battle.minPop, r.pop - rules.economy.deficitPopLoss);
      popLost += rules.economy.deficitPopLoss;
    }
    r.growthClock += 1;
    if (r.growthClock >= rules.economy.popGrowthEveryTurns) {
      r.growthClock = 0;
      if (r.pop < rules.caps.pop) {
        r.pop = Math.min(rules.caps.pop, r.pop + rules.economy.popGrowthAmount);
        popGained += rules.economy.popGrowthAmount;
      }
    }
  }
  if (popLost) lines.push({ label: 'População perdida (fome)', value: -popLost });
  if (popGained) lines.push({ label: 'População nova', value: popGained });
  return lines;
}

function nextAlive(state: GameState, from: number): number | null {
  const n = state.players.length;
  for (let i = from + 1; i < n; i++) if (!state.players[i].eliminated) return i;
  return null;
}

function firstAlive(state: GameState): number {
  return state.players.findIndex((p) => !p.eliminated);
}

function beginTurnFor(state: GameState, player: number, rules: Rules) {
  state.current = player;
  state.actionsLeft = rules.turn.actionsPerTurn;
  state.freeDiplomaticLeft =
    state.players[player].trait === 'diplomata' ? rules.traits.diplomata.freeDiplomaticActions : 0;
  state.phaseIndex = 0;
  state.attackedFrom = [];
  state.dilemma = null;
}

/** Result of ending a player turn. */
export interface EndTurnResult {
  state: GameState;
  report: ReportLine[];
}

/**
 * End the current player's turn: unresolved dilemma becomes Ignorar, economy
 * runs, then the next alive player starts. After the last player the round
 * ends: treaties count down and the turn number advances.
 */
export function endTurn(input: GameState, dilemmas: Dilemma[], rules: Rules, skipped = false): EndTurnResult {
  if (input.over) return { state: input, report: [] };
  let state = input;
  if (!state.dilemma?.resolved) state = chooseDilemma(state, dilemmaFor(state, dilemmas), IGNORE_OPTION, rules);
  else state = clone(state);
  const p = state.players[state.current];

  if (skipped) {
    p.missedTurns += 1;
    const t = rules.turn;
    if (p.missedTurns >= t.missedExit) {
      p.eliminated = true;
      state.treaties = state.treaties.filter((x) => x.a !== p.id && x.b !== p.id);
      state.log.push({ turn: state.turn, player: p.id, text: `${p.name} perdeu ${p.missedTurns} turnos e sai da partida.` });
    } else if (p.missedTurns >= t.missedAuto) {
      state.log.push({ turn: state.turn, player: p.id, text: `${p.name} ausente: ação padrão automática (${p.missedTurns}).` });
    } else if (p.missedTurns >= t.missedWarn) {
      state.log.push({ turn: state.turn, player: p.id, text: `Aviso: ${p.name} perdeu ${p.missedTurns} turnos.` });
    }
  } else {
    p.missedTurns = 0;
  }

  const report = p.eliminated ? [] : runEconomy(state, rules);

  const alive = state.players.filter((x) => !x.eliminated);
  if (alive.length <= 1) {
    state.over = true;
    state.log.push({ turn: state.turn, player: null, text: 'Fim de partida: resta um país.' });
    return { state, report };
  }

  const next = nextAlive(state, state.current);
  if (next !== null) {
    beginTurnFor(state, next, rules);
    return { state, report };
  }

  // Round over.
  for (const t of state.treaties) t.turnsLeft -= 1;
  for (const t of state.treaties.filter((x) => x.turnsLeft <= 0)) {
    state.log.push({ turn: state.turn, player: null, text: `Tratado entre ${state.players[t.a].name} e ${state.players[t.b].name} expirou.` });
  }
  state.treaties = state.treaties.filter((x) => x.turnsLeft > 0);
  if (state.turn >= state.maxTurns) {
    state.over = true;
    state.log.push({ turn: state.turn, player: null, text: `Fim do turno ${state.maxTurns}: contagem de pontos.` });
    return { state, report };
  }
  state.turn += 1;
  beginTurnFor(state, firstAlive(state), rules);
  return { state, report };
}
