import type { GameState, Rules } from './types';
import { PHASES } from './types';

/** Summary shown before an imported save is applied. */
export interface SaveSummary {
  version: number;
  turn: number;
  players: string[];
  treaties: number;
}

/** Result of reading a save file. Never applies anything by itself. */
export type ParseResult =
  | { ok: true; state: GameState; summary: SaveSummary }
  | { ok: false; reason: string };

/** Serialise the whole game to a versioned JSON string. */
export function exportSave(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

/** Suggested file name: paises-turnoN.json. */
export function saveFileName(state: GameState): string {
  return `paises-turno${state.turn}.json`;
}

const MAX_TEXT = 200;
const MAX_LOG = 5000;

const isInt = (v: unknown, min: number, max = Number.MAX_SAFE_INTEGER): v is number =>
  Number.isInteger(v) && (v as number) >= min && (v as number) <= max;
const isText = (v: unknown, max = MAX_TEXT): v is string => typeof v === 'string' && v.length <= max;
const isIndexOrNull = (v: unknown, n: number) => v === null || isInt(v, 0, n - 1);

/**
 * Check every field of a loaded state against the rules. Returns the first
 * problem found, or null when the state is safe to use.
 */
export function validateState(s: GameState, rules: Rules): string | null {
  const c = rules.caps;
  if (s.mode !== 't20') return 'Modo inválido';
  if (!isInt(s.maxTurns, 1, 1000)) return 'maxTurns inválido';
  if (!isInt(s.turn, 1, s.maxTurns)) return 'Turno inválido';
  if (typeof s.over !== 'boolean') return 'Campo over inválido';
  const n = s.players.length;
  if (n < rules.mode.minPlayers || n > rules.mode.maxPlayers) return 'Número de jogadores inválido';
  for (let i = 0; i < n; i++) {
    const p = s.players[i];
    if (typeof p !== 'object' || p === null || p.id !== i) return `Jogador ${i} inválido`;
    if (!isText(p.name, 40)) return `Nome do jogador ${i} inválido`;
    if (!(p.trait in rules.traits)) return `Traço do jogador ${i} inválido`;
    if (!isInt(p.money, 0)) return `Dinheiro do jogador ${i} inválido`;
    if (!isInt(p.influence, 0, c.influence)) return `Influência do jogador ${i} inválida`;
    if (!isInt(p.reputation, -1000, 1000)) return `Reputação do jogador ${i} inválida`;
    if (!isInt(p.missedTurns, 0, rules.turn.missedExit)) return `Turnos perdidos do jogador ${i} inválidos`;
    if (typeof p.eliminated !== 'boolean') return `Estado do jogador ${i} inválido`;
    if (!Array.isArray(p.recurring)) return `Pagamentos do jogador ${i} inválidos`;
    for (const r of p.recurring) {
      if (!isInt(r.money, -1000, 1000) || !isInt(r.turnsLeft, 1, 100) || !isText(r.label)) return `Pagamento do jogador ${i} inválido`;
    }
  }
  const ids = new Set(s.regions.map((r) => r?.id));
  if (ids.size !== s.regions.length) return 'Regiões repetidas';
  for (const r of s.regions) {
    if (typeof r !== 'object' || r === null || !isText(r.id, 40) || !isText(r.name, 40)) return 'Região inválida';
    if (!isInt(r.col, 0, 100) || !isInt(r.row, 0, 100)) return `Posição de ${r.id} inválida`;
    if (!Array.isArray(r.adj) || !r.adj.every((a) => ids.has(a))) return `Vizinhos de ${r.id} inválidos`;
    if (!isIndexOrNull(r.owner, n) || !isIndexOrNull(r.capitalOf, n)) return `Dono de ${r.id} inválido`;
    if (!isInt(r.pop, rules.battle.minPop, c.pop)) return `População de ${r.id} inválida`;
    if (!isInt(r.army, 0)) return `Exército de ${r.id} inválido`;
    if (!isInt(r.walls, 0, c.wallsPerRegion)) return `Muralhas de ${r.id} inválidas`;
    if (!isInt(r.buildings, 0, c.buildingsPerRegion)) return `Edifícios de ${r.id} inválidos`;
    if (!isInt(r.farms, 0)) return `Fazendas de ${r.id} inválidas`;
    if (!isInt(r.growthClock, 0, rules.economy.popGrowthEveryTurns)) return `Relógio de ${r.id} inválido`;
  }
  for (const t of s.treaties) {
    if (!isInt(t.a, 0, n - 1) || !isInt(t.b, 0, n - 1) || t.a === t.b) return 'Tratado inválido';
    if (!isInt(t.turnsLeft, 1, rules.treaty.duration) || !isInt(t.signedTurn, 1, s.maxTurns)) return 'Tratado inválido';
  }
  if (!Array.isArray(s.log) || s.log.length > MAX_LOG) return 'Diário inválido';
  for (const l of s.log) {
    if (!isInt(l.turn, 1, s.maxTurns) || !isIndexOrNull(l.player, n) || !isText(l.text, 500)) return 'Linha do diário inválida';
  }
  if (!isInt(s.current, 0, n - 1) || (!s.over && s.players[s.current].eliminated)) return 'Jogador da vez inválido';
  if (!isInt(s.actionsLeft, 0, rules.turn.maxActionsPerTurn)) return 'Ações inválidas';
  if (!isInt(s.freeDiplomaticLeft, 0, rules.traits.diplomata.freeDiplomaticActions)) return 'Ação grátis inválida';
  if (!isInt(s.phaseIndex, 0, PHASES.length - 1)) return 'Fase inválida';
  if (!Array.isArray(s.attackedFrom) || !s.attackedFrom.every((id) => ids.has(id))) return 'Ataques do turno inválidos';
  if (s.dilemma !== null && (typeof s.dilemma !== 'object' || !isText(s.dilemma.dilemmaId, 40) || typeof s.dilemma.resolved !== 'boolean')) {
    return 'Dilema inválido';
  }
  return null;
}

/** Parse and validate a save against the rules. Nothing is applied here. */
export function parseSave(text: string, rules: Rules): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, reason: 'Arquivo não é JSON válido' };
  }
  const s = data as Partial<GameState>;
  if (typeof s !== 'object' || s === null) return { ok: false, reason: 'Save vazio' };
  if (typeof s.version !== 'number') return { ok: false, reason: 'Save sem versão' };
  if (s.version !== rules.saveVersion) {
    return { ok: false, reason: `Versão ${s.version} incompatível (esperada ${rules.saveVersion})` };
  }
  if (!Array.isArray(s.players) || !Array.isArray(s.regions) || !Array.isArray(s.treaties)) {
    return { ok: false, reason: 'Save incompleto' };
  }
  const state = s as GameState;
  const problem = validateState(state, rules);
  if (problem) return { ok: false, reason: problem };
  return {
    ok: true,
    state,
    summary: { version: state.version, turn: state.turn, players: state.players.map((p) => p.name), treaties: state.treaties.length },
  };
}
