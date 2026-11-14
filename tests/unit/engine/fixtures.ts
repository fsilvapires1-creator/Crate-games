import rules from '../../../src/data/rules.json';
import map from '../../../src/data/map.json';
import dilemmasFile from '../../../src/data/dilemmas.json';
import { newGame, type GameState, type Region, type TraitId, type Dilemma, type MapData } from '../../../src/engine';

export { rules };
export const dilemmas = dilemmasFile.dilemmas as Dilemma[];
export const mapData = map as MapData;

/** A fresh 4-player game; traits default to Mercador. */
export function makeGame(traits: TraitId[] = ['mercador', 'mercador', 'mercador', 'mercador']): GameState {
  return newGame(
    traits.map((t, i) => ({ name: `P${i + 1}`, trait: t })),
    mapData,
    rules,
  );
}

/** A standalone region for formula tests. */
export function makeRegion(over: Partial<Region> = {}): Region {
  return {
    id: 'r', name: 'R', col: 0, row: 0, adj: [], owner: 0, capitalOf: null,
    pop: 6, army: 4, farms: 0, walls: 0, buildings: 0, growthClock: 0, ...over,
  };
}

/** Give region `id` to `owner` with the given fields. */
export function setRegion(state: GameState, id: string, over: Partial<Region>): Region {
  const r = state.regions.find((x) => x.id === id)!;
  Object.assign(r, over);
  return r;
}
