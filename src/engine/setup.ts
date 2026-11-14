import type { GameState, Player, Region, Rules, TraitId } from './types';

/** Map data shape, matching `src/data/map.json`. */
export interface MapData {
  cols: number;
  rows: number;
  regions: { id: string; name: string; col: number; row: number }[];
  /** Regions of each seat; the first one is the capital. */
  starts: Record<string, string[][]>;
  /** Optional subset of region ids used for a given player count (default: all). */
  regionsByPlayers?: Record<string, string[]>;
}

/** Hex neighbours of (col,row) in an odd-row-shifted offset grid. */
export function hexNeighbours(col: number, row: number): [number, number][] {
  const odd = row % 2 === 1;
  const d = odd
    ? [[1, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [1, 1]]
    : [[1, 0], [-1, 0], [-1, -1], [0, -1], [-1, 1], [0, 1]];
  return d.map(([dc, dr]) => [col + dc, row + dr]);
}

/** Build regions with adjacency derived from the hex layout. */
export function buildRegions(map: MapData, rules: Rules, players?: number): Region[] {
  const subset = players !== undefined ? map.regionsByPlayers?.[String(players)] : undefined;
  const used = subset ? map.regions.filter((r) => subset.includes(r.id)) : map.regions;
  const at = new Map(used.map((r) => [`${r.col},${r.row}`, r.id]));
  return used.map((r) => ({
    id: r.id,
    name: r.name,
    col: r.col,
    row: r.row,
    adj: hexNeighbours(r.col, r.row)
      .map(([c, w]) => at.get(`${c},${w}`))
      .filter((x): x is string => !!x),
    owner: null,
    capitalOf: null,
    pop: rules.neutral.pop,
    army: rules.neutral.army,
    farms: 0,
    walls: 0,
    buildings: 0,
    growthClock: 0,
  }));
}

/** One seat at the table. */
export interface PlayerSetup {
  name: string;
  trait: TraitId;
}

/** Create a new 20-turn game for 3-5 hot-seat players. */
export function newGame(setup: PlayerSetup[], map: MapData, rules: Rules): GameState {
  const { minPlayers, maxPlayers } = rules.mode;
  if (setup.length < minPlayers || setup.length > maxPlayers) {
    throw new Error(`Precisa de ${minPlayers} a ${maxPlayers} jogadores`);
  }
  const starts = map.starts[String(setup.length)];
  const regions = buildRegions(map, rules, setup.length);
  const players: Player[] = setup.map((s, i) => {
    const t = rules.traits[s.trait] as { startInfluenceDelta?: number; startArmyPerRegion?: number };
    starts[i].forEach((id, k) => {
      const region = regions.find((r) => r.id === id)!;
      region.owner = i;
      if (k === 0) region.capitalOf = i;
      region.pop = rules.start.pop;
      region.army = t.startArmyPerRegion ?? rules.start.armyPerRegion;
    });
    return {
      id: i,
      name: s.name,
      trait: s.trait,
      money: rules.start.money,
      influence: rules.start.influence + (t.startInfluenceDelta ?? 0),
      reputation: rules.start.reputation,
      missedTurns: 0,
      eliminated: false,
      recurring: [],
    };
  });
  return {
    version: rules.saveVersion,
    mode: 't20',
    turn: 1,
    maxTurns: rules.mode.maxTurns,
    current: 0,
    players,
    regions,
    treaties: [],
    log: [{ turn: 1, player: null, text: `Partida iniciada com ${players.length} países.` }],
    actionsLeft: rules.turn.actionsPerTurn,
    freeDiplomaticLeft: setup[0].trait === 'diplomata' ? rules.traits.diplomata.freeDiplomaticActions : 0,
    phaseIndex: 0,
    attackedFrom: [],
    dilemma: null,
    over: false,
  };
}
