import type { GameState } from './types';

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

/** Parse and validate a save. `expectedVersion` comes from rules.saveVersion. */
export function parseSave(text: string, expectedVersion: number): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, reason: 'Arquivo não é JSON válido' };
  }
  const s = data as Partial<GameState>;
  if (typeof s !== 'object' || s === null) return { ok: false, reason: 'Save vazio' };
  if (typeof s.version !== 'number') return { ok: false, reason: 'Save sem versão' };
  if (s.version !== expectedVersion) {
    return { ok: false, reason: `Versão ${s.version} incompatível (esperada ${expectedVersion})` };
  }
  if (!Array.isArray(s.players) || !Array.isArray(s.regions) || !Array.isArray(s.treaties) || typeof s.turn !== 'number') {
    return { ok: false, reason: 'Save incompleto' };
  }
  const state = s as GameState;
  return {
    ok: true,
    state,
    summary: { version: state.version, turn: state.turn, players: state.players.map((p) => p.name), treaties: state.treaties.length },
  };
}
