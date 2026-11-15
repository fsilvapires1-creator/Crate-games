import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Trait keys of the rules engine. */
export type TraitId = 'expansionista' | 'mercador' | 'diplomata' | 'militarista' | 'isolacionista';

/** Mirror of the engine's Region (see src/engine/types.ts of the engine checkout). */
export interface Region {
  id: string;
  name: string;
  adj: string[];
  owner: number | null;
  capitalOf: number | null;
  pop: number;
  army: number;
  farms: number;
  walls: number;
  buildings: number;
  growthClock: number;
}

/** Mirror of the engine's Player. */
export interface Player {
  id: number;
  name: string;
  trait: TraitId;
  money: number;
  influence: number;
  reputation: number;
  missedTurns: number;
  eliminated: boolean;
  recurring: { money: number; turnsLeft: number; label: string }[];
}

/** Mirror of the engine's GameState. */
export interface GameState {
  turn: number;
  maxTurns: number;
  current: number;
  players: Player[];
  regions: Region[];
  treaties: { a: number; b: number; turnsLeft: number; signedTurn: number }[];
  actionsLeft: number;
  freeDiplomaticLeft: number;
  phaseIndex: number;
  attackedFrom: string[];
  dilemma: { dilemmaId: string; resolved: boolean } | null;
  over: boolean;
}

/** Mirror of the engine's Action union. */
export type Action =
  /** `consent` is required by engines from e56251f on; older ones ignore it. */
  | { type: 'treaty'; with: number; consent: true }
  | { type: 'breakTreaty'; with: number }
  | { type: 'tradeInfluence' }
  | { type: 'recruit'; region: string }
  | { type: 'wall'; region: string }
  | { type: 'move'; from: string; to: string; amount: number }
  | { type: 'attack'; from: string; to: string; amount: number }
  | { type: 'farm'; region: string }
  | { type: 'building'; region: string };

/** Effects of one dilemma option. */
export interface DilemmaEffects {
  money?: number;
  influence?: number;
  reputation?: number;
  capitalArmy?: number;
  capitalPop?: number;
  upkeepOverTurns?: { money: number; turns: number };
}

/** One dilemma of src/data/dilemmas.json. */
export interface Dilemma {
  id: string;
  title: string;
  options: { id: string; label: string; effects: DilemmaEffects }[];
}

/** Rule values (src/data/rules.json). Kept loose: the simulator only reads them. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rules = any;

/** The engine functions the simulator calls. Nothing else of the engine is touched. */
export interface EngineApi {
  newGame(setup: { name: string; trait: TraitId }[], map: unknown, rules: Rules): GameState;
  applyAction(state: GameState, action: Action, rules: Rules): { ok: boolean; reason?: string; state: GameState; messages: string[] };
  endTurn(state: GameState, dilemmas: Dilemma[], rules: Rules, skipped?: boolean): { state: GameState; report: { label: string; value: number }[] };
  chooseDilemma(state: GameState, dilemma: Dilemma, optionId: string, rules: Rules): GameState;
  dilemmaFor(state: GameState, dilemmas: Dilemma[]): Dilemma;
  income(state: GameState, player: number, rules: Rules): number;
  upkeep(state: GameState, player: number, rules: Rules): number;
  score(state: GameState, player: number, rules: Rules): number;
  resolveBattle(
    attackers: number,
    attackerTrait: string | null,
    defenders: number,
    defense: number,
    defenderTrait: string | null,
    rules: Rules,
  ): { attackerWins: boolean; attackerLeft: number; defenderLeft: number };
  foodProduced(region: Region, player: Player | null, rules: Rules): number;
  foodConsumed(region: Region, rules: Rules): number;
  buildingCost(state: GameState, player: number, rules: Rules): number;
}

/** Engine code plus its data files, loaded from one checkout. */
export interface Engine {
  api: EngineApi;
  rules: Rules;
  map: unknown;
  dilemmas: Dilemma[];
  dir: string;
}

/**
 * Load the rules engine from `dir` (a checkout that has src/engine and src/data).
 * The simulator lives on another branch, so the engine is never copied here.
 */
export async function loadEngine(dir: string): Promise<Engine> {
  const root = resolve(dir);
  const json = (p: string) => JSON.parse(readFileSync(join(root, p), 'utf8'));
  const api = (await import(pathToFileURL(join(root, 'src/engine/index.ts')).href)) as EngineApi;
  return {
    api,
    rules: json('src/data/rules.json'),
    map: json('src/data/map.json'),
    dilemmas: json('src/data/dilemmas.json').dilemmas,
    dir: root,
  };
}
