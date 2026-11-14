import { describe, it, expect } from 'vitest';
import { endTurn, chooseDilemma, dilemmaFor, applyAction, exportSave, parseSave, type GameState } from '../../../src/engine';
import { rules, dilemmas, makeGame, setRegion } from './fixtures';

function endRound(g: GameState): GameState {
  const n = g.players.filter((p) => !p.eliminated).length;
  for (let i = 0; i < n; i++) g = endTurn(g, dilemmas, rules).state;
  return g;
}

describe('fim de turno', () => {
  it('applies Ignorar (-1 influence) when the dilemma is skipped', () => {
    const g = makeGame();
    const after = endTurn(g, dilemmas, rules).state;
    expect(after.players[0].influence).toBe(4);
  });
  it('pays income minus upkeep at the end of the player turn', () => {
    const g = makeGame();
    // Mercador: floor(6/2)+1 = 4 income; upkeep floor(4/3)=1
    const { state, report } = endTurn(g, dilemmas, rules);
    expect(state.players[0].money).toBe(53);
    expect(report.find((l) => l.label === 'Renda')!.value).toBe(4);
  });
  it('passes the turn to the next player and resets actions', () => {
    let g = makeGame();
    g = applyAction(g, { type: 'recruit', region: 'vallonia' }, rules).state;
    g = endTurn(g, dilemmas, rules).state;
    expect(g.current).toBe(1);
    expect(g.actionsLeft).toBe(3);
    expect(g.phaseIndex).toBe(0);
  });
  it('advances the round after the last player', () => {
    const g = endRound(makeGame());
    expect(g.turn).toBe(2);
    expect(g.current).toBe(0);
  });
  it('grows population by 1 every 3 turns', () => {
    let g = makeGame();
    for (let i = 0; i < 3; i++) g = endRound(g);
    expect(g.regions.find((r) => r.id === 'vallonia')!.pop).toBe(7);
  });
  it('loses 1 pop on a food deficit', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { pop: 20, growthClock: 0 });
    // produced 2+6=8, consumed 10
    const after = endTurn(g, dilemmas, rules).state;
    expect(after.regions.find((r) => r.id === 'vallonia')!.pop).toBe(19);
  });
  it('deserts armies when upkeep exceeds money', () => {
    const g = makeGame();
    g.players[0].money = 0;
    setRegion(g, 'vallonia', { army: 30, pop: 1 });
    // income floor(1/2)+1 = 1 ; upkeep 10 ; missing 9 -> 3 desert
    const after = endTurn(g, dilemmas, rules).state;
    expect(after.players[0].money).toBe(0);
    expect(after.regions.find((r) => r.id === 'vallonia')!.army).toBe(27);
  });
  it('expires a treaty after 8 rounds', () => {
    let g = applyAction(makeGame(), { type: 'treaty', with: 1 }, rules).state;
    for (let i = 0; i < 7; i++) g = endRound(g);
    expect(g.treaties).toHaveLength(1);
    g = endRound(g);
    expect(g.treaties).toHaveLength(0);
  });
  it('ends the game after turn 20', () => {
    let g = makeGame();
    for (let i = 0; i < 20; i++) g = endRound(g);
    expect(g.over).toBe(true);
    expect(g.turn).toBe(20);
  });
});

describe('dilemas', () => {
  it('applies the chosen option once', () => {
    const g = makeGame();
    const d = dilemmaFor(g, dilemmas);
    const opt = d.options[0];
    const once = chooseDilemma(g, d, opt.id, rules);
    const twice = chooseDilemma(once, d, opt.id, rules);
    expect(twice).toBe(once);
    expect(once.dilemma?.resolved).toBe(true);
  });
  it('charges the alliance -1 money per turn for 3 turns', () => {
    let g = makeGame();
    const d = dilemmas.find((x) => x.id === 'alianca')!;
    g = chooseDilemma(g, d, 'aceitar', rules);
    expect(g.players[0].recurring).toEqual([{ money: -1, turnsLeft: 3, label: d.title }]);
    for (let i = 0; i < 3; i++) g = endRound(g);
    expect(g.players[0].recurring).toHaveLength(0);
  });
});

describe('turno perdido', () => {
  it('warns at 2, keeps playing at 3, removes the player at 5', () => {
    let g = makeGame();
    const skipP1 = () => {
      g = endTurn(g, dilemmas, rules, true).state;
      for (let i = 1; i < 4; i++) g = endTurn(g, dilemmas, rules).state;
    };
    skipP1();
    skipP1();
    expect(g.log.some((l) => l.text.startsWith('Aviso: P1'))).toBe(true);
    skipP1();
    expect(g.players[0].eliminated).toBe(false);
    skipP1();
    skipP1();
    expect(g.players[0].eliminated).toBe(true);
  });
  it('resets the missed count when the player plays', () => {
    let g = makeGame();
    g = endTurn(g, dilemmas, rules, true).state;
    for (let i = 1; i < 4; i++) g = endTurn(g, dilemmas, rules).state;
    g = endTurn(g, dilemmas, rules).state;
    expect(g.players[0].missedTurns).toBe(0);
  });
});

describe('save', () => {
  it('round-trips the whole state', () => {
    const g = endRound(makeGame());
    const parsed = parseSave(exportSave(g), rules.saveVersion);
    expect(parsed.ok && parsed.state).toEqual(g);
  });
  it('refuses another version', () => {
    const g = makeGame();
    const parsed = parseSave(exportSave({ ...g, version: 99 }), rules.saveVersion);
    expect(parsed.ok).toBe(false);
  });
  it('refuses broken JSON', () => {
    expect(parseSave('{oops', rules.saveVersion).ok).toBe(false);
  });
});

describe('ações por turno', () => {
  it('gives 3 actions with fewer than 4 regions', () => {
    const g = endRound(makeGame());
    expect(g.actionsLeft).toBe(3);
  });
  it('gives a 4th action with 4 or more regions, never more than 4', () => {
    const g = makeGame();
    for (const id of ['pedra-alta', 'vale-verde', 'rio-meio', 'corvena']) setRegion(g, id, { owner: 0 });
    const next = endRound(g);
    expect(next.current).toBe(0);
    expect(next.actionsLeft).toBe(4);
  });
});
