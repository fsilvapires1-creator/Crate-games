/** Rule values loaded from `src/data/rules.json`. */
export type Rules = typeof import('../data/rules.json');

/** Trait keys, matching `rules.traits`. */
export type TraitId = 'expansionista' | 'mercador' | 'diplomata' | 'militarista' | 'isolacionista';

/** One map region. Each region holds exactly one city. */
export interface Region {
  id: string;
  name: string;
  col: number;
  row: number;
  adj: string[];
  /** Player index, or null for neutral. */
  owner: number | null;
  /** Player index whose capital this region is, or null. */
  capitalOf: number | null;
  pop: number;
  army: number;
  farms: number;
  walls: number;
  buildings: number;
  /** Turns since the last population growth tick. */
  growthClock: number;
}

/** A recurring money effect, e.g. the alliance dilemma tribute. */
export interface Recurring {
  money: number;
  turnsLeft: number;
  label: string;
}

/** One country (one hot-seat player). */
export interface Player {
  id: number;
  name: string;
  trait: TraitId;
  money: number;
  influence: number;
  reputation: number;
  missedTurns: number;
  eliminated: boolean;
  recurring: Recurring[];
}

/** Active treaty between two players. */
export interface Treaty {
  a: number;
  b: number;
  turnsLeft: number;
  signedTurn: number;
}

/** One line in the public event log. */
export interface LogEntry {
  turn: number;
  player: number | null;
  text: string;
}

/** Action phases, in the order they must happen within one player turn. */
export const PHASES = ['diplomacia', 'recrutamento', 'ataque', 'economia'] as const;
export type Phase = (typeof PHASES)[number];

/** The pending dilemma shown at the start of a player turn. */
export interface PendingDilemma {
  dilemmaId: string;
  resolved: boolean;
}

/** Full game state. Plain JSON: it is what the save file holds. */
export interface GameState {
  version: number;
  mode: 't20';
  turn: number;
  maxTurns: number;
  current: number;
  players: Player[];
  regions: Region[];
  treaties: Treaty[];
  log: LogEntry[];
  /** Actions left for the current player this turn. */
  actionsLeft: number;
  freeDiplomaticLeft: number;
  /** Index into PHASES: actions of an earlier phase are no longer allowed. */
  phaseIndex: number;
  /** Regions whose armies already attacked this turn. */
  attackedFrom: string[];
  dilemma: PendingDilemma | null;
  over: boolean;
}

/** Everything a player can do. */
export type Action =
  /** `consent` must be true: the other player accepted. */
  | { type: 'treaty'; with: number; consent: boolean }
  | { type: 'breakTreaty'; with: number }
  | { type: 'tradeInfluence' }
  | { type: 'recruit'; region: string }
  | { type: 'wall'; region: string }
  | { type: 'move'; from: string; to: string; amount: number }
  | { type: 'attack'; from: string; to: string; amount: number }
  | { type: 'farm'; region: string }
  | { type: 'building'; region: string };

/** Outcome of applying (or previewing) an action. */
export interface ActionResult {
  ok: boolean;
  reason?: string;
  state: GameState;
  messages: string[];
}
