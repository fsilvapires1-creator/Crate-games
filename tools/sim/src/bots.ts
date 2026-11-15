import type { Action, Dilemma, Engine, GameState, Region } from './engine';
import type { Rng } from './rng';

/** Bot archetypes. */
export const STRATEGIES = ['agressivo', 'mercador', 'tartaruga', 'oportunista', 'traidor', 'passivo'] as const;
export type StrategyId = (typeof STRATEGIES)[number];

/** Tunables of one archetype (tools/sim/config.json, key `strategies`). */
export interface StrategyParams {
  label: string;
  /** Money the bot keeps after optional spending. */
  reserve: number;
  /** Trades money for influence above this amount. */
  tradeAbove: number;
  /** Sends at least minimalWinningArmy * attackMargin. */
  attackMargin: number;
  /** Which targets the bot may attack. */
  attacks: 'all' | 'neutral' | 'weakest' | 'none';
  /** Sends everything but one soldier. */
  massAttack: boolean;
  /** Proposes a treaty when its expected money profit is at least this. */
  treatyMinProfit: number;
  acceptTreatyProb: number;
  /** Weight of the points an enemy loses when valuing a conquest. */
  denyWeight: number;
  /** Builds income buildings only with at least this many rounds left. */
  buildingMinTurnsLeft: number;
  walls: boolean;
  farms: boolean;
  /** Breaks a treaty when the conquest it opens is worth more than the fine. */
  betrays: boolean;
  dilemma: { money: number; influence: number; reputation: number; army: number; pop: number };
}

/** What a bot may see and use on its turn. The game state is fully public (hot-seat). */
export interface BotCtx {
  eng: Engine;
  /** Rules of this game (may be a variant of the engine's rules.json). */
  rules: Engine['rules'];
  rng: Rng;
  me: number;
  params: StrategyParams;
  pointsPerMoney: number;
  /** Rounds at the end in which spare money is traded for influence. */
  endgameRounds: number;
  /** Regions the referee does not let attack again this turn (rule "1 attack per army"). */
  blockedOrigins: ReadonlySet<string>;
  /** Free notes the bot keeps between its own decisions. */
  memory: { betrayTarget?: number };
}

/** One archetype. A bot only returns intentions; the harness applies them with applyAction. */
export interface Bot {
  id: StrategyId;
  /** Option id for the dilemma, or null to leave it unresolved (the engine applies Ignorar). */
  dilemma(state: GameState, dilemma: Dilemma, ctx: BotCtx): string | null;
  /** Candidate actions for right now, best first. Empty list ends the turn. */
  plan(state: GameState, ctx: BotCtx): Action[];
  /** Answer to a treaty proposed by `from`. */
  acceptTreaty(state: GameState, from: number, ctx: BotCtx): boolean;
}

const PHASE = { diplomacia: 0, recrutamento: 1, ataque: 2, economia: 3 } as const;

const owned = (s: GameState, p: number) => s.regions.filter((r) => r.owner === p);
const regionById = (s: GameState, id: string) => s.regions.find((r) => r.id === id)!;
const hasTreaty = (s: GameState, a: number, b: number) =>
  s.treaties.some((t) => (t.a === a && t.b === b) || (t.a === b && t.b === a));
const treatyCount = (s: GameState, p: number) => s.treaties.filter((t) => t.a === p || t.b === p).length;
const roundsLeft = (s: GameState) => s.maxTurns - s.turn + 1;
const neighbours = (s: GameState, r: Region) => r.adj.map((id) => regionById(s, id));

/** A battle this player could start now and win. */
export interface AttackOption {
  from: Region;
  to: Region;
  /** Smallest army that wins. */
  minWin: number;
  /** Largest army that may leave (one stays). */
  maxSend: number;
  /** Net value in score points, by the bot's own valuation. */
  value: number;
}

/** Score-point value of taking `to`, by the bot's valuation (not an engine rule). */
export function conquestValue(s: GameState, to: Region, ctx: BotCtx): number {
  const r = ctx.rules;
  const popAfter = Math.max(r.battle.minPop, to.pop - r.battle.conquestPopLoss);
  const incomeAfter = Math.floor(popAfter / r.economy.incomePopDivisor) + to.buildings * r.effects.buildingIncome;
  const own =
    (to.capitalOf !== null ? r.score.conqueredCapital : 0) +
    popAfter / r.score.popDivisor +
    incomeAfter * (roundsLeft(s) - 1) * ctx.pointsPerMoney;
  const denied =
    to.owner === null ? 0 : (to.capitalOf === to.owner ? r.score.ownCapital : to.capitalOf !== null ? r.score.conqueredCapital : 0) + to.pop / r.score.popDivisor;
  return own + ctx.params.denyWeight * denied - r.costs.conquest * ctx.pointsPerMoney;
}

/**
 * Every attack the current player can win right now.
 * `ignoreTreatyWith` lets the traitor look at a partner before breaking the treaty.
 */
export function attackOptions(s: GameState, ctx: BotCtx, ignoreTreatyWith: number | null = null): AttackOption[] {
  const me = ctx.me;
  const r = ctx.rules;
  const out: AttackOption[] = [];
  if (s.players[me].money < r.costs.conquest) return out;
  for (const from of owned(s, me)) {
    if (from.army < 2 || s.attackedFrom.includes(from.id) || ctx.blockedOrigins.has(from.id)) continue;
    for (const to of neighbours(s, from)) {
      if (to.owner === me) continue;
      if (to.owner !== null && to.owner !== ignoreTreatyWith && hasTreaty(s, me, to.owner)) continue;
      const defTrait = to.owner === null ? null : s.players[to.owner].trait;
      const defense = to.walls * r.effects.wallDefense;
      const maxSend = from.army - 1;
      const wins = (n: number) => ctx.eng.api.resolveBattle(n, s.players[me].trait, to.army, defense, defTrait, r).attackerWins;
      if (!wins(maxSend)) continue;
      let minWin = maxSend;
      while (minWin > 1 && wins(minWin - 1)) minWin -= 1;
      out.push({ from, to, minWin, maxSend, value: conquestValue(s, to, ctx) });
    }
  }
  return out;
}

/** True when a non-treaty neighbour could take this region by sending all but one. */
function threatened(s: GameState, region: Region, ctx: BotCtx): boolean {
  const r = ctx.rules;
  return neighbours(s, region).some((e) => {
    if (e.owner === null || e.owner === ctx.me || s.players[e.owner].eliminated) return false;
    if (hasTreaty(s, ctx.me, e.owner) || e.army < 2) return false;
    return ctx.eng.api.resolveBattle(e.army - 1, s.players[e.owner].trait, region.army, region.walls * r.effects.wallDefense, s.players[ctx.me].trait, r)
      .attackerWins;
  });
}

/** Own regions that touch a region of someone else. */
function borderRegions(s: GameState, me: number): Region[] {
  return owned(s, me).filter((r) => neighbours(s, r).some((n) => n.owner !== me));
}

/** Pick the dilemma option with the best weighted effect that the player can pay for. */
function dilemmaByWeights(s: GameState, d: Dilemma, ctx: BotCtx): string {
  const w = ctx.params.dilemma;
  const money = s.players[ctx.me].money;
  let best = 'ignorar';
  let bestU = -Infinity;
  for (const o of d.options) {
    const e = o.effects;
    if (e.money !== undefined && e.money < 0 && money < -e.money) continue;
    const recurring = e.upkeepOverTurns ? e.upkeepOverTurns.money * e.upkeepOverTurns.turns : 0;
    const u =
      ((e.money ?? 0) + recurring) * w.money +
      (e.influence ?? 0) * w.influence +
      (e.reputation ?? 0) * w.reputation +
      (e.capitalArmy ?? 0) * w.army +
      (e.capitalPop ?? 0) * w.pop;
    if (u > bestU) {
      bestU = u;
      best = o.id;
    }
  }
  return best;
}

/** Order attack options the way the archetype wants and turn them into actions. */
function attackActions(opts: AttackOption[], ctx: BotCtx): Action[] {
  const p = ctx.params;
  let list = opts;
  if (p.attacks === 'none') return [];
  if (p.attacks === 'neutral') list = list.filter((o) => o.to.owner === null);
  const need = (o: AttackOption) => Math.min(o.maxSend, Math.ceil(o.minWin * p.attackMargin));
  if (!p.massAttack) list = list.filter((o) => Math.ceil(o.minWin * p.attackMargin) <= o.maxSend && o.value > 0);
  const sorted = list.slice().sort((a, b) => {
    if (p.attacks === 'weakest' && a.to.army !== b.to.army) return a.to.army - b.to.army;
    return b.value - a.value || a.to.id.localeCompare(b.to.id) || a.from.id.localeCompare(b.from.id);
  });
  return sorted.map((o) => ({ type: 'attack', from: o.from.id, to: o.to.id, amount: p.massAttack ? o.maxSend : need(o) }));
}

/** Treaty proposals worth their price for this archetype, neighbours first. */
function treatyProposals(s: GameState, ctx: BotCtx): Action[] {
  const r = ctx.rules;
  const me = ctx.me;
  const p = s.players[me];
  if (treatyCount(s, me) >= r.caps.activeTreaties || p.money < r.costs.treaty + ctx.params.reserve) return [];
  const profit = owned(s, me).length * r.treaty.incomePerRegion * Math.min(r.treaty.duration, roundsLeft(s)) - r.costs.treaty;
  if (profit < ctx.params.treatyMinProfit) return [];
  const mine = owned(s, me);
  const isNeighbour = (other: number) => mine.some((reg) => neighbours(s, reg).some((n) => n.owner === other));
  return s.players
    .filter((o) => o.id !== me && !o.eliminated && !hasTreaty(s, me, o.id) && treatyCount(s, o.id) < r.caps.activeTreaties && o.money >= r.costs.treaty)
    .sort((a, b) => Number(isNeighbour(b.id)) - Number(isNeighbour(a.id)) || a.id - b.id)
    .map((o) => ({ type: 'treaty', with: o.id, consent: true }));
}

/** Farms for cities that are starving, or about to. */
function farmActions(s: GameState, ctx: BotCtx, eager: boolean): Action[] {
  if (!ctx.params.farms) return [];
  const r = ctx.rules;
  const p = s.players[ctx.me];
  if (p.money < r.costs.farm + ctx.params.reserve) return [];
  return owned(s, ctx.me)
    .filter((reg) => {
      const balance = ctx.eng.api.foodProduced(reg, p, r) - ctx.eng.api.foodConsumed(reg, r);
      return eager ? balance <= 0 && reg.pop < r.caps.pop : balance < 0;
    })
    .sort((a, b) => b.pop - a.pop)
    .map((reg) => ({ type: 'farm', region: reg.id }));
}

/** Shared planner. Archetypes differ only by their parameters and the traitor's extra step. */
function planByParams(s: GameState, ctx: BotCtx): Action[] {
  const r = ctx.rules;
  const me = ctx.me;
  const p = s.players[me];
  const prm = ctx.params;
  const out: Action[] = [];
  const lastTurn = s.turn >= s.maxTurns;
  const mine = owned(s, me);
  if (mine.length === 0) return out;

  const opts = prm.attacks === 'none' ? [] : attackOptions(s, ctx);
  const attacks = attackActions(opts, ctx);
  const canTrade = p.influence < r.caps.influence && p.money >= r.costs.influenceTrade;

  if (s.phaseIndex <= PHASE.diplomacia) {
    // Traitor: break a treaty when the partner has a region worth more than the fine.
    if (prm.betrays) {
      const fine = r.treaty.breakInfluence + r.treaty.breakMoney * ctx.pointsPerMoney;
      let best: { partner: number; gain: number } | null = null;
      for (const t of s.treaties) {
        const partner = t.a === me ? t.b : t.b === me ? t.a : null;
        if (partner === null) continue;
        if (p.money < r.treaty.breakMoney + r.costs.conquest) continue;
        const targets = attackOptions(s, ctx, partner).filter((o) => o.to.owner === partner && Math.ceil(o.minWin * prm.attackMargin) <= o.maxSend);
        const gain = Math.max(-Infinity, ...targets.map((o) => o.value)) - fine;
        if (gain > 0 && (!best || gain > best.gain)) best = { partner, gain };
      }
      if (best && s.actionsLeft + s.freeDiplomaticLeft >= 2) {
        ctx.memory.betrayTarget = best.partner;
        out.push({ type: 'breakTreaty', with: best.partner });
      }
    }
    out.push(...treatyProposals(s, ctx));
    if (canTrade) {
      const keepForAttack = attacks.length > 0 ? r.costs.conquest : 0;
      const spare = p.money - keepForAttack >= r.costs.influenceTrade && (attacks.length === 0 || s.actionsLeft > 1);
      if (roundsLeft(s) <= ctx.endgameRounds && spare) out.push({ type: 'tradeInfluence' });
      else if (!lastTurn && p.money >= prm.tradeAbove && spare) out.push({ type: 'tradeInfluence' });
    }
  }

  if (s.phaseIndex <= PHASE.recrutamento && !lastTurn) {
    const inDanger = mine.filter((reg) => threatened(s, reg, ctx)).sort((a, b) => Number(b.capitalOf === me) - Number(a.capitalOf === me) || b.pop - a.pop);
    const border = borderRegions(s, me);
    if (prm.walls) {
      for (const reg of [...inDanger, ...border]) {
        if (reg.walls < r.caps.wallsPerRegion && p.money >= r.costs.wall + (inDanger.includes(reg) ? 0 : prm.reserve)) out.push({ type: 'wall', region: reg.id });
      }
    }
    if (p.money >= r.costs.recruit) for (const reg of inDanger) out.push({ type: 'recruit', region: reg.id });

    if (prm.massAttack) {
      // Mass: recruit on the front while an action and the conquest fee remain.
      const origins = new Set(opts.map((o) => o.from.id)).size;
      const front =
        opts.length > 0
          ? opts.slice().sort((a, b) => b.value - a.value)[0].from
          : border.slice().sort((a, b) => b.army - a.army || a.id.localeCompare(b.id))[0];
      const spareAction = s.actionsLeft > Math.max(opts.length > 0 ? 1 : 0, Math.min(origins, 2));
      if (front && spareAction && p.money >= r.costs.recruit + r.costs.conquest) out.push({ type: 'recruit', region: front.id });
      // Bring idle troops from the interior to the front.
      for (const reg of mine) {
        if (border.includes(reg) || reg.army < 2) continue;
        const to = neighbours(s, reg).find((n) => n.owner === me && border.includes(n));
        if (to && s.actionsLeft > 1) out.push({ type: 'move', from: reg.id, to: to.id, amount: reg.army - 1 });
      }
    } else if (prm.attacks !== 'none' && attacks.length === 0 && s.actionsLeft > 1) {
      // No safe attack yet: grow the biggest border army, keeping the conquest fee.
      const front = border.slice().sort((a, b) => b.army - a.army || a.id.localeCompare(b.id))[0];
      if (front && p.money >= r.costs.recruit + r.costs.conquest + prm.reserve) out.push({ type: 'recruit', region: front.id });
    }

    if (roundsLeft(s) >= prm.buildingMinTurnsLeft) {
      const cost = ctx.eng.api.buildingCost(s, me, r);
      const spot = mine
        .filter((reg) => reg.buildings < r.caps.buildingsPerRegion && !inDanger.includes(reg))
        .sort((a, b) => Number(b.capitalOf === me) - Number(a.capitalOf === me) || b.pop - a.pop)[0];
      if (spot && p.money >= cost + prm.reserve) out.push({ type: 'building', region: spot.id });
    }
  }

  if (s.phaseIndex <= PHASE.ataque) {
    const target = ctx.memory.betrayTarget;
    if (target !== undefined) {
      out.push(...attacks.filter((a) => a.type === 'attack' && regionById(s, a.to).owner === target));
    }
    out.push(...attacks);
  }

  if (!lastTurn) out.push(...farmActions(s, ctx, prm.walls));
  return out;
}

/** Build the bot of one archetype. */
export function makeBot(id: StrategyId): Bot {
  if (id === 'passivo') {
    return { id, dilemma: () => null, plan: () => [], acceptTreaty: () => false };
  }
  return {
    id,
    dilemma: dilemmaByWeights,
    plan: planByParams,
    acceptTreaty: (s, from, ctx) => {
      const r = ctx.rules;
      if (s.players[ctx.me].money < r.costs.treaty) return false;
      if (treatyCount(s, ctx.me) >= r.caps.activeTreaties) return false;
      void from;
      return ctx.rng.next() < ctx.params.acceptTreatyProb;
    },
  };
}
