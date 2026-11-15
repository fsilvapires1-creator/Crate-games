import { makeBot, type Bot, type BotCtx, type StrategyId, type StrategyParams } from './bots';
import type { Action, Engine, GameState, Rules, TraitId } from './engine';
import { makeRng } from './rng';

/** Who sits where. */
export interface SeatSpec {
  strategy: StrategyId;
  trait: TraitId;
}

/** Simulator-side settings (tools/sim/config.json). */
export interface SimConfig {
  gamesPerConfig: number;
  campaign: { turns: number; sessionLength: number; players: number };
  superlinearUpkeep: { freeAbove: number };
  snowballTurn: number;
  money: { lowBelow: number; highAbove: number };
  valuation: { pointsPerMoney: number };
  endgameRounds: number;
  strategies: Record<StrategyId, StrategyParams>;
}

/** Options of one game. Referee switches never change engine code. */
export interface GameOpts {
  seats: SeatSpec[];
  /** Rules for this game: the engine's rules.json or a variant with other values. */
  rules: Rules;
  seed: number;
  /** Referee refuses a second attack from a region conquered this turn (fix A2 preview). */
  noChain: boolean;
  /** Give each player a second starting region (fix A1 preview, approximate placement). */
  secondStartRegion: boolean;
  /** Charge the superlinear upkeep proposal on top of the engine's upkeep (experiment only). */
  chargeSuperlinear: boolean;
}

/** State of one seat at the end of a round. */
export interface SeatSnapshot {
  score: number;
  money: number;
  influence: number;
  pop: number;
  army: number;
  regions: number;
  income: number;
  upkeep: number;
  alive: boolean;
}

/** Totals of one seat over a game. */
export interface SeatResult {
  strategy: StrategyId;
  trait: TraitId;
  won: boolean;
  eliminated: boolean;
  finalScore: number;
  finalMoney: number;
  finalPop: number;
  finalArmy: number;
  finalRegions: number;
  finalInfluence: number;
  firstConquestTurn: number | null;
  conquests: number;
  attacksLost: number;
  treatiesSigned: number;
  treatiesBroken: number;
  dilemmasIgnored: number;
  dilemmasSeen: number;
  actions: Record<string, number>;
  turnsPlayed: number;
  turnsWithoutAction: number;
  turnsMoneyLow: number;
  turnsMoneyHigh: number;
  maxMoney: number;
  deserters: number;
  popLostToHunger: number;
  upkeepLinear: number;
  upkeepSuperlinear: number;
  incomeTotal: number;
}

/** Everything measured in one game. */
export interface GameResult {
  seed: number;
  players: number;
  seats: SeatResult[];
  winner: number;
  roundsPlayed: number;
  endedEarly: boolean;
  leaderAtSnowballTurn: number | null;
  eliminations: number;
  totalActions: number;
  roundsWithoutAnyAction: number;
  rejectedCandidates: number;
  treatiesRefused: number;
  /** Per round, per seat. */
  rounds: SeatSnapshot[][];
}

const ACTION_TYPES = ['treaty', 'breakTreaty', 'tradeInfluence', 'recruit', 'wall', 'move', 'attack', 'farm', 'building'] as const;

function ownedBy(state: GameState, p: number) {
  return state.regions.filter((r) => r.owner === p);
}

/** Seats ordered by score, then army, then seat. Eliminated players go last. */
export function standing(state: GameState, eng: Engine, rules: Rules): number[] {
  const army = (p: number) => ownedBy(state, p).reduce((s, r) => s + r.army, 0);
  return state.players
    .map((p) => p.id)
    .sort(
      (a, b) =>
        Number(state.players[a].eliminated) - Number(state.players[b].eliminated) ||
        eng.api.score(state, b, rules) - eng.api.score(state, a, rules) ||
        army(b) - army(a) ||
        a - b,
    );
}

/** Superlinear upkeep proposal: floor(n/divisor) + max(0, n - freeAbove) per region. */
export function superlinearUpkeep(state: GameState, player: number, rules: Rules, freeAbove: number): number {
  return ownedBy(state, player).reduce(
    (s, r) => s + Math.floor(r.army / rules.economy.upkeepArmyDivisor) + Math.max(0, r.army - freeAbove),
    0,
  );
}

/** Approximation of fix A1: every player gets one more starting region next to the capital. */
function addSecondStartRegion(state: GameState, rules: Rules): void {
  for (const p of state.players) {
    const capital = state.regions.find((r) => r.capitalOf === p.id)!;
    const free = (id: string) => state.regions.find((r) => r.id === id && r.owner === null);
    const near = capital.adj.map(free).filter((r): r is NonNullable<typeof r> => !!r);
    const calm = near.filter((r) => r.adj.every((a) => {
      const o = state.regions.find((x) => x.id === a)!.owner;
      return o === null || o === p.id;
    }));
    const pick = calm[0] ?? near[0] ?? state.regions.find((r) => r.owner === null);
    if (!pick) continue;
    const t = rules.traits[p.trait] as { startArmyPerRegion?: number };
    pick.owner = p.id;
    pick.pop = rules.start.pop;
    pick.army = t.startArmyPerRegion ?? rules.start.armyPerRegion;
  }
}

function snapshot(state: GameState, eng: Engine, rules: Rules): SeatSnapshot[] {
  return state.players.map((p) => {
    const regs = ownedBy(state, p.id);
    return {
      score: eng.api.score(state, p.id, rules),
      money: p.money,
      influence: p.influence,
      pop: regs.reduce((s, r) => s + r.pop, 0),
      army: regs.reduce((s, r) => s + r.army, 0),
      regions: regs.length,
      income: p.eliminated ? 0 : eng.api.income(state, p.id, rules),
      upkeep: p.eliminated ? 0 : eng.api.upkeep(state, p.id, rules),
      alive: !p.eliminated,
    };
  });
}

/** Play one full game with bots. Deterministic for a given (opts, engine, config). */
export function playGame(eng: Engine, cfg: SimConfig, opts: GameOpts): GameResult {
  const { api, dilemmas } = eng;
  const rules = opts.rules;
  const rng = makeRng(opts.seed);
  const bots: Bot[] = opts.seats.map((s) => makeBot(s.strategy));
  let state = api.newGame(
    opts.seats.map((s, i) => ({ name: `${s.strategy}-${s.trait}-${i}`, trait: s.trait })),
    eng.map,
    rules,
  );
  if (opts.secondStartRegion) addSecondStartRegion(state, rules);

  const seats: SeatResult[] = opts.seats.map((s) => ({
    strategy: s.strategy, trait: s.trait, won: false, eliminated: false,
    finalScore: 0, finalMoney: 0, finalPop: 0, finalArmy: 0, finalRegions: 0, finalInfluence: 0,
    firstConquestTurn: null, conquests: 0, attacksLost: 0, treatiesSigned: 0, treatiesBroken: 0,
    dilemmasIgnored: 0, dilemmasSeen: 0,
    actions: Object.fromEntries(ACTION_TYPES.map((t) => [t, 0])),
    turnsPlayed: 0, turnsWithoutAction: 0, turnsMoneyLow: 0, turnsMoneyHigh: 0, maxMoney: 0,
    deserters: 0, popLostToHunger: 0, upkeepLinear: 0, upkeepSuperlinear: 0, incomeTotal: 0,
  }));
  const res: GameResult = {
    seed: opts.seed, players: opts.seats.length, seats, winner: -1, roundsPlayed: 0, endedEarly: false,
    leaderAtSnowballTurn: null, eliminations: 0, totalActions: 0, roundsWithoutAnyAction: 0,
    rejectedCandidates: 0, treatiesRefused: 0, rounds: [],
  };

  const ctxFor = (me: number, blocked: Set<string>, memory: BotCtx['memory']): BotCtx => ({
    eng, rules, rng, me, params: cfg.strategies[opts.seats[me].strategy],
    pointsPerMoney: cfg.valuation.pointsPerMoney, endgameRounds: cfg.endgameRounds, blockedOrigins: blocked, memory,
  });

  let actionsThisRound = 0;
  const guardTurns = state.maxTurns * state.players.length + 5;
  for (let step = 0; step < guardTurns && !state.over; step++) {
    const me = state.current;
    const round = state.turn;
    const seat = seats[me];
    const blocked = new Set<string>();
    const memory: BotCtx['memory'] = {};
    const ctx = ctxFor(me, blocked, memory);

    const dilemma = api.dilemmaFor(state, dilemmas);
    const choice = bots[me].dilemma(state, dilemma, ctx);
    seat.dilemmasSeen += 1;
    if (choice === null || choice === 'ignorar') seat.dilemmasIgnored += 1;
    if (choice !== null) state = api.chooseDilemma(state, dilemma, choice, rules);

    let done = 0;
    for (let guard = 0; guard < 16; guard++) {
      const candidates = bots[me].plan(state, ctx);
      let applied: Action | null = null;
      for (const c of candidates) {
        if (c.type === 'attack' && opts.noChain && blocked.has(c.from)) continue;
        if (c.type === 'treaty' && !bots[c.with].acceptTreaty(state, me, ctxFor(c.with, new Set(), {}))) {
          res.treatiesRefused += 1;
          continue;
        }
        const before = state;
        const out = api.applyAction(state, c, rules);
        if (!out.ok) {
          res.rejectedCandidates += 1;
          continue;
        }
        state = out.state;
        applied = c;
        seat.actions[c.type] += 1;
        if (c.type === 'attack') {
          const took = state.regions.find((r) => r.id === c.to)!.owner === me;
          if (took) {
            seat.conquests += 1;
            if (seat.firstConquestTurn === null) seat.firstConquestTurn = round;
            if (opts.noChain) blocked.add(c.to);
          } else seat.attacksLost += 1;
          state.players.forEach((p, i) => {
            if (p.eliminated && !before.players[i].eliminated) res.eliminations += 1;
          });
        }
        if (c.type === 'treaty') {
          seat.treatiesSigned += 1;
          seats[c.with].treatiesSigned += 1;
        }
        if (c.type === 'breakTreaty') seat.treatiesBroken += 1;
        break;
      }
      if (!applied) break;
      done += 1;
    }
    seat.turnsPlayed += 1;
    if (done === 0) seat.turnsWithoutAction += 1;
    res.totalActions += done;
    actionsThisRound += done;

    const linear = api.upkeep(state, me, rules);
    const superlinear = superlinearUpkeep(state, me, rules, cfg.superlinearUpkeep.freeAbove);
    seat.upkeepLinear += linear;
    seat.upkeepSuperlinear += superlinear;
    seat.incomeTotal += api.income(state, me, rules);

    const end = api.endTurn(state, dilemmas, rules);
    state = end.state;
    for (const line of end.report) {
      if (line.label === 'Desertores') seat.deserters += -line.value;
      if (line.label.startsWith('População perdida')) seat.popLostToHunger += -line.value;
    }
    if (opts.chargeSuperlinear && !state.players[me].eliminated) {
      const extra = Math.max(0, superlinear - linear);
      state.players[me].money = Math.max(0, state.players[me].money - extra);
    }
    const money = state.players[me].money;
    seat.maxMoney = Math.max(seat.maxMoney, money);
    if (money < cfg.money.lowBelow) seat.turnsMoneyLow += 1;
    if (money > cfg.money.highAbove) seat.turnsMoneyHigh += 1;

    if (state.over || state.turn !== round) {
      res.roundsPlayed = round;
      res.rounds.push(snapshot(state, eng, rules));
      if (actionsThisRound === 0) res.roundsWithoutAnyAction += 1;
      actionsThisRound = 0;
      if (round === cfg.snowballTurn) res.leaderAtSnowballTurn = standing(state, eng, rules)[0];
    }
  }

  const order = standing(state, eng, rules);
  res.winner = order[0];
  res.endedEarly = res.roundsPlayed < state.maxTurns;
  state.players.forEach((p, i) => {
    const regs = ownedBy(state, i);
    const s = seats[i];
    s.won = i === res.winner;
    s.eliminated = p.eliminated;
    s.finalScore = api.score(state, i, rules);
    s.finalMoney = p.money;
    s.finalInfluence = p.influence;
    s.finalPop = regs.reduce((a, r) => a + r.pop, 0);
    s.finalArmy = regs.reduce((a, r) => a + r.army, 0);
    s.finalRegions = regs.length;
  });
  return res;
}
