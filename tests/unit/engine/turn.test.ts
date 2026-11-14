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
    // Mercador, 2 cities: (3+1)*2 = 8 income; upkeep floor(3/3)*2 = 2
    const { state, report } = endTurn(g, dilemmas, rules);
    expect(state.players[0].money).toBe(56);
    expect(report.find((l) => l.label === 'Renda')!.value).toBe(8);
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
    setRegion(g, 'vale-verde', { army: 1, pop: 1 });
    // income (0+1)*2 = 2 ; upkeep 10 ; missing 8 -> 2 desert
    const after = endTurn(g, dilemmas, rules).state;
    expect(after.players[0].money).toBe(0);
    expect(after.regions.find((r) => r.id === 'vallonia')!.army).toBe(28);
  });
  it('expires a treaty after 8 rounds', () => {
    let g = applyAction(makeGame(), { type: 'treaty', with: 1, consent: true }, rules).state;
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
    const parsed = parseSave(exportSave(g), rules);
    expect(parsed.ok && parsed.state).toEqual(g);
  });
  it('refuses another version', () => {
    const g = makeGame();
    const parsed = parseSave(exportSave({ ...g, version: 99 }), rules);
    expect(parsed.ok).toBe(false);
  });
  it('refuses broken JSON', () => {
    expect(parseSave('{oops', rules).ok).toBe(false);
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

describe('revisão Fable (turno e save)', () => {
  it('M1: an option the player cannot pay becomes Ignorar', () => {
    const g = makeGame();
    g.players[0].money = 0;
    const d = dilemmas.find((x) => x.id === 'ponte')!;
    const after = chooseDilemma(g, d, 'financiar', rules);
    expect(after.players[0].influence).toBe(4);
  });
  it('B3: a dilemma never drops the capital army below 1', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 1 });
    const d = { id: 'x', title: 'X', text: '', options: [{ id: 'a', label: 'a', effects: { capitalArmy: -5 } }, { id: 'ignorar', label: 'i', effects: {} }] };
    expect(chooseDilemma(g, d, 'a', rules).regions.find((r) => r.id === 'vallonia')!.army).toBe(1);
  });
  it('M5: desertion takes the largest army first, ties by id, never below 1', () => {
    const g = makeGame();
    g.players[0].money = 0;
    for (const r of g.regions) Object.assign(r, { owner: 0, army: 1, pop: 1 });
    g.players[0].trait = 'militarista';
    // 12 armies of 1: upkeep floor(12/4) = 3, income 0 -> 1 would desert, but none may drop below 1
    const after = endTurn(g, dilemmas, rules).state;
    expect(after.regions.filter((r) => r.owner === 0).every((r) => r.army === 1)).toBe(true);
  });
  it('M2: a player who leaves after 5 missed turns leaves neutral regions with army 0', () => {
    let g = makeGame();
    for (let k = 0; k < 5; k++) {
      g = endTurn(g, dilemmas, rules, true).state;
      for (let i = 1; i < 4; i++) g = endTurn(g, dilemmas, rules).state;
    }
    const v = g.regions.find((r) => r.id === 'vallonia')!;
    expect(v.owner).toBe(null);
    expect(v.army).toBe(0);
    expect(v.capitalOf).toBe(0);
  });
  it('A3: refuses saves with bad types, HTML in ids or out-of-range numbers', () => {
    const good = JSON.parse(exportSave(makeGame()));
    const cases: ((s: any) => void)[] = [
      (s) => { s.players[0].id = '"><img src=x onerror=alert(1)>'; },
      (s) => { s.log[0].turn = '<b>1</b>'; },
      (s) => { s.players[0].trait = 'rei'; },
      (s) => { s.current = 99; },
      (s) => { s.players[0].money = -1e9; },
      (s) => { s.regions[0].army = 1.5; },
      (s) => { s.maxTurns = '20'; },
      (s) => { s.regions[0].adj = ['nowhere']; },
    ];
    for (const breakIt of cases) {
      const s = structuredClone(good);
      breakIt(s);
      expect(parseSave(JSON.stringify(s), rules).ok).toBe(false);
    }
    expect(parseSave(JSON.stringify(good), rules).ok).toBe(true);
  });
});
