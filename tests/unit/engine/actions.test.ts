import { describe, it, expect } from 'vitest';
import { applyAction, previewAction } from '../../../src/engine';
import { rules, makeGame, setRegion } from './fixtures';

describe('ações básicas', () => {
  it('recruits 4 armies for 10 money', () => {
    const g = makeGame();
    const r = applyAction(g, { type: 'recruit', region: 'vallonia' }, rules);
    expect(r.ok).toBe(true);
    expect(r.state.players[0].money).toBe(40);
    expect(r.state.regions.find((x) => x.id === 'vallonia')!.army).toBe(7);
    expect(r.state.actionsLeft).toBe(2);
  });
  it('does not mutate the input state', () => {
    const g = makeGame();
    applyAction(g, { type: 'recruit', region: 'vallonia' }, rules);
    expect(g.players[0].money).toBe(50);
  });
  it('limits walls to 2 per region', () => {
    let g = makeGame();
    g.players[0].money = 100;
    g = applyAction(g, { type: 'wall', region: 'vallonia' }, rules).state;
    g = applyAction(g, { type: 'wall', region: 'vallonia' }, rules).state;
    g.actionsLeft = 3;
    const r = applyAction(g, { type: 'wall', region: 'vallonia' }, rules);
    expect(r.ok).toBe(false);
  });
  it('charges Expansionista 25 for a building', () => {
    const g = makeGame(['expansionista', 'mercador', 'mercador', 'mercador']);
    const r = applyAction(g, { type: 'building', region: 'vallonia' }, rules);
    expect(r.state.players[0].money).toBe(25);
  });
  it('trades 10 money for 1 influence', () => {
    const r = applyAction(makeGame(), { type: 'tradeInfluence' }, rules);
    expect(r.state.players[0].influence).toBe(6);
    expect(r.state.players[0].money).toBe(40);
  });
  it('refuses actions after the 3 per turn are spent', () => {
    let g = makeGame();
    g.players[0].money = 100;
    for (let i = 0; i < 3; i++) g = applyAction(g, { type: 'recruit', region: 'vallonia' }, rules).state;
    expect(applyAction(g, { type: 'recruit', region: 'vallonia' }, rules).ok).toBe(false);
  });
  it('refuses an action from an earlier phase', () => {
    let g = makeGame();
    g = applyAction(g, { type: 'farm', region: 'vallonia' }, rules).state;
    const r = applyAction(g, { type: 'recruit', region: 'vallonia' }, rules);
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/fase/);
  });
});

describe('movimento', () => {
  it('moves only to an adjacent own region and leaves 1 behind', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 4 });
    setRegion(g, 'pedra-alta', { owner: 0, army: 1 });
    expect(applyAction(g, { type: 'move', from: 'vallonia', to: 'pedra-alta', amount: 4 }, rules).ok).toBe(false);
    const r = applyAction(g, { type: 'move', from: 'vallonia', to: 'pedra-alta', amount: 3 }, rules);
    expect(r.ok).toBe(true);
    expect(r.state.regions.find((x) => x.id === 'pedra-alta')!.army).toBe(4);
  });
});

describe('ataque e conquista', () => {
  it('conquers a neutral region: survivors occupy, pop -2, attacker pays 20', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 11 });
    const r = applyAction(g, { type: 'attack', from: 'vallonia', to: 'pedra-alta', amount: 10 }, rules);
    expect(r.ok).toBe(true);
    const t = r.state.regions.find((x) => x.id === 'pedra-alta')!;
    expect(t.owner).toBe(0);
    expect(t.army).toBe(7);
    expect(t.pop).toBe(2);
    expect(r.state.players[0].money).toBe(30);
    expect(r.state.regions.find((x) => x.id === 'vallonia')!.army).toBe(1);
  });
  it('returns attacker survivors home on defeat', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 3 });
    setRegion(g, 'pedra-alta', { army: 5 });
    const r = applyAction(g, { type: 'attack', from: 'vallonia', to: 'pedra-alta', amount: 2 }, rules);
    expect(r.state.regions.find((x) => x.id === 'pedra-alta')!.owner).toBe(null);
    // 2 attack, lose max(1,floor(0.8))=1 -> 1 returns; 1 stayed
    expect(r.state.regions.find((x) => x.id === 'vallonia')!.army).toBe(2);
    expect(r.state.players[0].money).toBe(50);
  });
  it('lets each region attack only once per turn', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 20 });
    setRegion(g, 'pedra-alta', { army: 1 });
    const first = applyAction(g, { type: 'attack', from: 'vallonia', to: 'pedra-alta', amount: 3 }, rules).state;
    const again = applyAction(first, { type: 'attack', from: 'vallonia', to: 'vale-verde', amount: 3 }, rules);
    expect(again.ok).toBe(false);
  });
  it('blocks attacks on a treaty partner', () => {
    const g = makeGame();
    setRegion(g, 'pedra-alta', { owner: 1 });
    g.treaties.push({ a: 0, b: 1, turnsLeft: 8, signedTurn: 1 });
    expect(applyAction(g, { type: 'attack', from: 'vallonia', to: 'pedra-alta', amount: 3 }, rules).ok).toBe(false);
  });
  it('eliminates a player who loses the last city', () => {
    const g = makeGame();
    setRegion(g, 'norte-frio', { army: 1 });
    setRegion(g, 'corvena', { owner: 0, army: 10 });
    const r = applyAction(g, { type: 'attack', from: 'corvena', to: 'norte-frio', amount: 9 }, rules);
    expect(r.state.players[1].eliminated).toBe(true);
  });
});

describe('tratados', () => {
  it('costs 10 to each side and lasts 8 turns', () => {
    const r = applyAction(makeGame(), { type: 'treaty', with: 1 }, rules);
    expect(r.state.players[0].money).toBe(40);
    expect(r.state.players[1].money).toBe(40);
    expect(r.state.treaties[0].turnsLeft).toBe(8);
  });
  it('allows at most 2 active treaties', () => {
    let g = makeGame();
    g = applyAction(g, { type: 'treaty', with: 1 }, rules).state;
    g = applyAction(g, { type: 'treaty', with: 2 }, rules).state;
    expect(applyAction(g, { type: 'treaty', with: 3 }, rules).ok).toBe(false);
  });
  it('break costs -3 influence, -2 reputation, -10 money', () => {
    let g = makeGame();
    g = applyAction(g, { type: 'treaty', with: 1 }, rules).state;
    const r = applyAction(g, { type: 'breakTreaty', with: 1 }, rules);
    expect(r.state.treaties).toHaveLength(0);
    expect(r.state.players[0].influence).toBe(2);
    expect(r.state.players[0].reputation).toBe(-2);
    expect(r.state.players[0].money).toBe(30);
  });
  it('gives Diplomata one free diplomatic action', () => {
    const g = makeGame(['diplomata', 'mercador', 'mercador', 'mercador']);
    const r = applyAction(g, { type: 'treaty', with: 1 }, rules);
    expect(r.state.actionsLeft).toBe(3);
    expect(r.state.freeDiplomaticLeft).toBe(0);
  });
});

describe('prévia', () => {
  it('shows the exact cost without changing the state', () => {
    const g = makeGame();
    const p = previewAction(g, { type: 'recruit', region: 'vallonia' }, rules);
    expect(p).toMatchObject({ ok: true, money: -10, army: 4, influence: 0 });
    expect(g.players[0].money).toBe(50);
  });
  it('reports the reason when an action is not allowed', () => {
    const g = makeGame();
    g.players[0].money = 5;
    expect(previewAction(g, { type: 'recruit', region: 'vallonia' }, rules).reason).toMatch(/dinheiro/);
  });
});

describe('decisões da coordenação', () => {
  it('limits buildings to 2 per region', () => {
    let g = makeGame();
    g.players[0].money = 200;
    g = applyAction(g, { type: 'building', region: 'vallonia' }, rules).state;
    g = applyAction(g, { type: 'building', region: 'vallonia' }, rules).state;
    expect(applyAction(g, { type: 'building', region: 'vallonia' }, rules).ok).toBe(false);
  });
  it('puts the influence trade in phase 1 so recruiting still works after it', () => {
    let g = makeGame();
    g = applyAction(g, { type: 'tradeInfluence' }, rules).state;
    expect(applyAction(g, { type: 'recruit', region: 'vallonia' }, rules).ok).toBe(true);
  });
  it('does not spend the Diplomata free action on a trade', () => {
    const g = makeGame(['diplomata', 'mercador', 'mercador', 'mercador']);
    const r = applyAction(g, { type: 'tradeInfluence' }, rules);
    expect(r.state.freeDiplomaticLeft).toBe(1);
    expect(r.state.actionsLeft).toBe(2);
  });
});

describe('edifício na fase 2', () => {
  it('allows recruiting after a building', () => {
    let g = makeGame();
    g.players[0].money = 200;
    g = applyAction(g, { type: 'building', region: 'vallonia' }, rules).state;
    expect(applyAction(g, { type: 'recruit', region: 'vallonia' }, rules).ok).toBe(true);
  });
});
