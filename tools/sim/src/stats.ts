import type { GameResult, SeatResult, SeatSnapshot } from './game';

/** Averages of a set of seats (one row of a table). */
export interface SeatRow {
  key: string;
  seats: number;
  winRate: number;
  /** Win rate divided by the fair share (1 / players). 1.00 = balanced. */
  winIndex: number;
  score: number;
  money: number;
  maxMoney: number;
  pop: number;
  regions: number;
  army: number;
  influence: number;
  eliminated: number;
  conquered: number;
  firstConquestTurn: number | null;
  conquests: number;
  attacksLost: number;
  treatiesSigned: number;
  treatiesBroken: number;
  dilemmasIgnored: number;
  idleTurns: number;
  moneyLow: number;
  moneyHigh: number;
  deserters: number;
  hunger: number;
  upkeepShare: number;
  superlinearShare: number;
  actions: Record<string, number>;
}

/** Game-level numbers of one experiment. */
export interface GameRow {
  games: number;
  rounds: number;
  endedEarly: number;
  snowball: number;
  snowballSample: number;
  eliminations: number;
  gamesWithElimination: number;
  impasses: number;
  quietRounds: number;
  actionsPerPlayerTurn: number;
  treatiesRefused: number;
  rejectedCandidates: number;
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

/** Group all seats of a set of games by `keyOf` and average them. */
export function seatRows(games: GameResult[], keyOf: (s: SeatResult) => string): SeatRow[] {
  const groups = new Map<string, { s: SeatResult; players: number }[]>();
  for (const g of games) for (const s of g.seats) {
    const k = keyOf(s);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push({ s, players: g.players });
  }
  const rows: SeatRow[] = [];
  for (const [key, list] of groups) {
    const seats = list.map((x) => x.s);
    const winRate = mean(seats.map((s) => Number(s.won)));
    const fair = mean(list.map((x) => 1 / x.players));
    const conquerors = seats.filter((s) => s.firstConquestTurn !== null);
    const turns = seats.reduce((a, s) => a + s.turnsPlayed, 0) || 1;
    const income = seats.reduce((a, s) => a + s.incomeTotal, 0) || 1;
    const actions: Record<string, number> = {};
    for (const s of seats) for (const [t, n] of Object.entries(s.actions)) actions[t] = (actions[t] ?? 0) + n;
    for (const t of Object.keys(actions)) actions[t] = round(actions[t] / turns, 3);
    rows.push({
      key, seats: seats.length, winRate: round(winRate, 3), winIndex: round(winRate / fair, 2),
      score: round(mean(seats.map((s) => s.finalScore)), 1),
      money: round(mean(seats.map((s) => s.finalMoney)), 1),
      maxMoney: round(mean(seats.map((s) => s.maxMoney)), 1),
      pop: round(mean(seats.map((s) => s.finalPop)), 1),
      regions: round(mean(seats.map((s) => s.finalRegions)), 2),
      army: round(mean(seats.map((s) => s.finalArmy)), 1),
      influence: round(mean(seats.map((s) => s.finalInfluence)), 1),
      eliminated: round(mean(seats.map((s) => Number(s.eliminated))), 3),
      conquered: round(conquerors.length / seats.length, 3),
      firstConquestTurn: conquerors.length ? round(mean(conquerors.map((s) => s.firstConquestTurn!)), 1) : null,
      conquests: round(mean(seats.map((s) => s.conquests)), 2),
      attacksLost: round(mean(seats.map((s) => s.attacksLost)), 2),
      treatiesSigned: round(mean(seats.map((s) => s.treatiesSigned)), 2),
      treatiesBroken: round(mean(seats.map((s) => s.treatiesBroken)), 2),
      dilemmasIgnored: round(seats.reduce((a, s) => a + s.dilemmasIgnored, 0) / (seats.reduce((a, s) => a + s.dilemmasSeen, 0) || 1), 3),
      idleTurns: round(seats.reduce((a, s) => a + s.turnsWithoutAction, 0) / turns, 3),
      moneyLow: round(seats.reduce((a, s) => a + s.turnsMoneyLow, 0) / turns, 3),
      moneyHigh: round(seats.reduce((a, s) => a + s.turnsMoneyHigh, 0) / turns, 3),
      deserters: round(mean(seats.map((s) => s.deserters)), 2),
      hunger: round(mean(seats.map((s) => s.popLostToHunger)), 2),
      upkeepShare: round(seats.reduce((a, s) => a + s.upkeepLinear, 0) / income, 3),
      superlinearShare: round(seats.reduce((a, s) => a + s.upkeepSuperlinear, 0) / income, 3),
      actions,
    });
  }
  return rows.sort((a, b) => b.winIndex - a.winIndex || a.key.localeCompare(b.key));
}

/** Game-level averages. */
export function gameRow(games: GameResult[]): GameRow {
  const withLeader = games.filter((g) => g.leaderAtSnowballTurn !== null);
  const playerTurns = games.reduce((a, g) => a + g.seats.reduce((b, s) => b + s.turnsPlayed, 0), 0) || 1;
  const rounds = games.reduce((a, g) => a + g.roundsPlayed, 0) || 1;
  return {
    games: games.length,
    rounds: round(mean(games.map((g) => g.roundsPlayed)), 1),
    endedEarly: round(mean(games.map((g) => Number(g.endedEarly))), 3),
    snowball: round(mean(withLeader.map((g) => Number(g.leaderAtSnowballTurn === g.winner))), 3),
    snowballSample: withLeader.length,
    eliminations: round(mean(games.map((g) => g.eliminations)), 2),
    gamesWithElimination: round(mean(games.map((g) => Number(g.eliminations > 0))), 3),
    impasses: round(mean(games.map((g) => Number(g.totalActions === 0))), 3),
    quietRounds: round(games.reduce((a, g) => a + g.roundsWithoutAnyAction, 0) / rounds, 3),
    actionsPerPlayerTurn: round(games.reduce((a, g) => a + g.totalActions, 0) / playerTurns, 2),
    treatiesRefused: round(mean(games.map((g) => g.treatiesRefused)), 2),
    rejectedCandidates: round(mean(games.map((g) => g.rejectedCandidates)), 2),
  };
}

/** Average of living seats at the end of the given rounds (time series for the campaign). */
export function timeSeries(games: GameResult[], rounds: number[]): (Record<keyof Omit<SeatSnapshot, 'alive'>, number> & { round: number; alive: number; maxMoney: number })[] {
  return rounds.map((r) => {
    const snaps = games.flatMap((g) => g.rounds[r - 1] ?? []);
    const alive = snaps.filter((s) => s.alive);
    const avg = (f: (s: SeatSnapshot) => number) => round(mean(alive.map(f)), 1);
    return {
      round: r,
      alive: round(snaps.length ? alive.length / snaps.length : 0, 3),
      score: avg((s) => s.score), money: avg((s) => s.money), influence: avg((s) => s.influence),
      pop: avg((s) => s.pop), army: avg((s) => s.army), regions: avg((s) => s.regions),
      income: avg((s) => s.income), upkeep: avg((s) => s.upkeep),
      maxMoney: alive.reduce((m, s) => Math.max(m, s.money), 0),
    };
  });
}
