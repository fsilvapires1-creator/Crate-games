import { STRATEGIES, type StrategyId } from './bots';
import type { Rules, TraitId } from './engine';
import type { GameOpts, SeatSpec } from './game';
import type { Rng } from './rng';

/** The five traits of the game. */
export const TRAITS: TraitId[] = ['expansionista', 'mercador', 'diplomata', 'militarista', 'isolacionista'];

/** One batch of games that share a setup rule. */
export interface Experiment {
  id: string;
  group: 'mix' | 'trait-fixed' | 'strategy-fixed' | 'fix-preview' | 'war' | 'upkeep' | 'campaign';
  title: string;
  players: number;
  games: number;
  /** Builds the seats of one game from a seeded source. */
  seats(rng: Rng): SeatSpec[];
  /** Changes rule VALUES for this experiment (never code). */
  rules?(base: Rules): Rules;
  referee: Pick<GameOpts, 'noChain' | 'secondStartRegion' | 'chargeSuperlinear'>;
}

const PLAIN = { noChain: false, secondStartRegion: false, chargeSuperlinear: false };
const ACTIVE = STRATEGIES.filter((s) => s !== 'passivo');

const randomSeats = (n: number, pool: readonly StrategyId[] = STRATEGIES) => (rng: Rng): SeatSpec[] =>
  Array.from({ length: n }, () => ({ strategy: rng.pick(pool), trait: rng.pick(TRAITS) }));

const withRules = (patch: (r: Rules) => void) => (base: Rules): Rules => {
  const copy = structuredClone(base);
  patch(copy);
  return copy;
};

/**
 * Every experiment of the report, in order. `n` is games per configuration.
 * `engineHasFixes` is true when the engine already starts players with 2 regions and
 * blocks chained attacks (commit e56251f on): the referee previews are then left out.
 */
export function buildExperiments(n: number, campaignTurns: number, campaignPlayers: number, engineHasFixes: boolean): Experiment[] {
  const list: Experiment[] = [];
  const counts = [3, 4, 5];

  for (const p of counts) {
    list.push({
      id: `mix-${p}`, group: 'mix', title: `Mistura livre, ${p} jogadores (motor como está)`,
      players: p, games: n * 5, seats: randomSeats(p), referee: PLAIN,
    });
  }
  for (const trait of TRAITS) {
    for (const p of counts) {
      list.push({
        id: `trait-${trait}-${p}`, group: 'trait-fixed', title: `Todos ${trait}, estratégias sorteadas, ${p} jogadores`,
        players: p, games: n,
        seats: (rng) => rng.shuffle(STRATEGIES).slice(0, p).map((strategy) => ({ strategy, trait })),
        referee: PLAIN,
      });
    }
  }
  for (const strategy of STRATEGIES) {
    for (const p of counts) {
      list.push({
        id: `strategy-${strategy}-${p}`, group: 'strategy-fixed', title: `Todos ${strategy}, traços sorteados, ${p} jogadores`,
        players: p, games: n,
        seats: (rng) => rng.shuffle(TRAITS).slice(0, p).map((trait) => ({ strategy, trait })),
        referee: PLAIN,
      });
    }
  }
  for (const p of engineHasFixes ? [] : counts) {
    list.push({
      id: `fixA1-${p}`, group: 'fix-preview', title: `Prévia A1 (2 regiões iniciais), ${p} jogadores`,
      players: p, games: n * 5, seats: randomSeats(p), referee: { ...PLAIN, secondStartRegion: true },
    });
    list.push({
      id: `fixA1A2-${p}`, group: 'fix-preview', title: `Prévia A1 + A2 (2 regiões, 1 ataque por exército), ${p} jogadores`,
      players: p, games: n * 5, seats: randomSeats(p), referee: { ...PLAIN, secondStartRegion: true, noChain: true },
    });
  }

  const fields: { key: string; label: string; others: readonly StrategyId[] }[] = [
    { key: 'turtles', label: '1 agressivo x 3 tartarugas', others: ['tartaruga'] },
    { key: 'field', label: '1 agressivo x 3 sorteados (sem agressivo)', others: ACTIVE.filter((s) => s !== 'agressivo') },
    { key: 'passive', label: '1 agressivo x 3 passivos', others: ['passivo'] },
  ];
  for (const f of fields) {
    for (const walls of [true, false]) {
      for (const noChain of engineHasFixes ? [true] : [false, true]) {
        list.push({
          id: `war-${f.key}-${walls ? 'walls' : 'nowalls'}-${noChain ? 'nochain' : 'chain'}`,
          group: 'war',
          title: `${f.label}; ${walls ? 'com muralha' : 'sem muralha'}; ${noChain ? '1 ataque por exército' : 'ataque encadeado (motor atual)'}`,
          players: 4, games: n,
          seats: (rng) =>
            rng.shuffle<SeatSpec>([
              { strategy: 'agressivo', trait: rng.pick(TRAITS) },
              ...Array.from({ length: 3 }, () => ({ strategy: rng.pick(f.others), trait: rng.pick(TRAITS) })),
            ]),
          rules: walls ? undefined : withRules((r) => { r.caps.wallsPerRegion = 0; }),
          referee: { ...PLAIN, noChain: noChain && !engineHasFixes },
        });
      }
    }
  }

  for (const charge of [false, true]) {
    list.push({
      id: `upkeep-${charge ? 'superlinear' : 'linear'}`, group: 'upkeep',
      title: `Mistura livre, 4 jogadores, manutenção ${charge ? 'superlinear cobrada pelo árbitro (só medição)' : 'linear (regra atual)'}`,
      players: 4, games: n * 5, seats: randomSeats(4), referee: { ...PLAIN, chargeSuperlinear: charge },
    });
  }

  const long = withRules((r) => { r.mode.maxTurns = campaignTurns; });
  list.push({
    id: 'campaign-mix', group: 'campaign', title: `Campanha ${campaignTurns} turnos, ${campaignPlayers} bots sorteados (motor como está)`,
    players: campaignPlayers, games: n, seats: randomSeats(campaignPlayers), rules: long, referee: PLAIN,
  });
  if (!engineHasFixes) list.push({
    id: 'campaign-fixes', group: 'campaign', title: `Campanha ${campaignTurns} turnos, ${campaignPlayers} bots sorteados, prévia A1 + A2`,
    players: campaignPlayers, games: n, seats: randomSeats(campaignPlayers), rules: long,
    referee: { ...PLAIN, secondStartRegion: true, noChain: true },
  });
  list.push({
    id: 'campaign-peace', group: 'campaign', title: `Campanha ${campaignTurns} turnos, só mercador e tartaruga (economia pura)`,
    players: campaignPlayers, games: n, seats: randomSeats(campaignPlayers, ['mercador', 'tartaruga']), rules: long, referee: PLAIN,
  });
  return list;
}
