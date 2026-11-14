import { describe, it, expect } from 'vitest';
import {
  battleForce, battleLoss, resolveBattle, cityIncome, income, foodProduced, foodConsumed,
  upkeep, desertions, score, ranking,
} from '../../../src/engine';
import { rules, makeGame, makeRegion, setRegion } from './fixtures';

describe('renda', () => {
  it('gives floor(pop/2) per city with no trait bonus', () => {
    const g = makeGame(['diplomata', 'mercador', 'mercador', 'mercador']);
    expect(cityIncome(makeRegion({ pop: 7 }), g.players[0], rules)).toBe(3);
  });
  it('adds +1 per city for Mercador', () => {
    const g = makeGame();
    expect(cityIncome(makeRegion({ pop: 6 }), g.players[0], rules)).toBe(4);
  });
  it('adds +1 per region per active treaty', () => {
    const g = makeGame(['diplomata', 'diplomata', 'mercador', 'mercador']);
    setRegion(g, 'pedra-alta', { owner: 0, pop: 4 });
    g.treaties.push({ a: 0, b: 1, turnsLeft: 8, signedTurn: 1 });
    // cities: 3 (vallonia) + 3 (vale-verde) + 2 (pedra-alta) ; treaty: 1 treaty * 3 regions = 3
    expect(income(g, 0, rules)).toBe(11);
  });
});

describe('comida', () => {
  it('produces 2 + floor(pop/3) + 3 per farm', () => {
    expect(foodProduced(makeRegion({ pop: 7, farms: 2 }), null, rules)).toBe(2 + 2 + 6);
  });
  it('adds +1 per city for Isolacionista', () => {
    const g = makeGame(['isolacionista', 'mercador', 'mercador', 'mercador']);
    expect(foodProduced(makeRegion({ pop: 6 }), g.players[0], rules)).toBe(5);
  });
  it('consumes ceil(pop/2)', () => {
    expect(foodConsumed(makeRegion({ pop: 7 }), rules)).toBe(4);
  });
});

describe('manutenção', () => {
  it('charges floor(army/3) per region', () => {
    const g = makeGame();
    setRegion(g, 'vallonia', { army: 8 });
    setRegion(g, 'vale-verde', { army: 2 });
    expect(upkeep(g, 0, rules)).toBe(2);
  });
  it('adds floor(total/4) for Militarista', () => {
    const g = makeGame(['militarista', 'mercador', 'mercador', 'mercador']);
    setRegion(g, 'vallonia', { army: 9 });
    setRegion(g, 'vale-verde', { army: 0 });
    expect(upkeep(g, 0, rules)).toBe(3 + 2);
  });
  it('deserts one army per 3 missing money', () => {
    expect(desertions(2, rules)).toBe(0);
    expect(desertions(7, rules)).toBe(2);
  });
});

describe('batalha', () => {
  it('computes force as army*(1+defense/10)', () => {
    expect(battleForce(5, 6, null, rules)).toBeCloseTo(8);
  });
  it('removes 1 force for Diplomata, never below 1', () => {
    expect(battleForce(4, 0, 'diplomata', rules)).toBe(3);
    expect(battleForce(1, 0, 'diplomata', rules)).toBe(1);
  });
  it('gives a tie to the defender', () => {
    const out = resolveBattle(4, null, 4, 0, null, rules);
    expect(out.attackerWins).toBe(false);
  });
  it('lets a wall turn an even fight', () => {
    expect(resolveBattle(5, null, 4, 3, null, rules).attackerWins).toBe(false);
    expect(resolveBattle(6, null, 4, 3, null, rules).attackerWins).toBe(true);
  });
  it('applies 30% loss to winner and 40% to loser', () => {
    const out = resolveBattle(10, null, 5, 0, null, rules);
    expect(out.attackerLeft).toBe(7);
    expect(out.defenderLeft).toBe(3);
  });
  it('loses at least 1 but always keeps 1 survivor', () => {
    expect(battleLoss(2, 0.3, rules)).toBe(1);
    expect(battleLoss(1, 0.4, rules)).toBe(0);
    expect(battleLoss(0, 0.4, rules)).toBe(0);
  });
});

describe('pontuação', () => {
  it('scores own capital x3 + floor(pop/4) + influence', () => {
    const g = makeGame();
    // capital 3 + floor(12/4)=3 + influence 5
    expect(score(g, 0, rules)).toBe(11);
  });
  it('counts a conquered capital as x1', () => {
    const g = makeGame();
    setRegion(g, 'norte-frio', { owner: 0, pop: 2 });
    // own 3 + conquered 1 + floor(14/4)=3 + 5
    expect(score(g, 0, rules)).toBe(12);
  });
  it('caps influence at 30', () => {
    const g = makeGame();
    g.players[0].influence = 40;
    expect(score(g, 0, rules)).toBe(3 + 3 + 30);
  });
  it('breaks ties by total army', () => {
    const g = makeGame();
    setRegion(g, 'almaris', { army: 9 });
    expect(ranking(g, rules)[0].name).toBe('P3');
  });
});

describe('traços na criação', () => {
  it('apply starting army and influence changes', () => {
    const g = makeGame(['expansionista', 'mercador', 'militarista', 'isolacionista']);
    expect(g.players[0].influence).toBe(4);
    expect(g.regions.find((r) => r.capitalOf === 1)!.army).toBe(3);
    expect(g.regions.find((r) => r.capitalOf === 2)!.army).toBe(5);
    expect(g.players[3].influence).toBe(4);
  });
});

describe('mapa por número de jogadores', () => {
  it('uses 8 regions for 3 players and 12 for 4', async () => {
    const { newGame } = await import('../../../src/engine');
    const { mapData } = await import('./fixtures');
    const three = newGame(['a', 'b', 'c'].map((n) => ({ name: n, trait: 'mercador' as const })), mapData, rules);
    expect(three.regions).toHaveLength(8);
    expect(makeGame().regions).toHaveLength(12);
  });
  it('gives neutral regions no income to anyone', () => {
    const g = makeGame();
    const before = g.players.map((_, i) => income(g, i, rules));
    expect(before).toEqual([8, 8, 8, 8]);
  });
});

describe('revisão Fable (mapa e ranking)', () => {
  it('A1: every player starts with 2 regions; neutrals are 2/4/2', async () => {
    const { newGame } = await import('../../../src/engine');
    const { mapData } = await import('./fixtures');
    for (const [n, neutrals] of [[3, 2], [4, 4], [5, 2]] as const) {
      const g = newGame(Array.from({ length: n }, (_, i) => ({ name: `P${i}`, trait: 'mercador' as const })), mapData, rules);
      for (let i = 0; i < n; i++) expect(g.regions.filter((r) => r.owner === i)).toHaveLength(2);
      expect(g.regions.filter((r) => r.owner === null)).toHaveLength(neutrals);
      expect(g.regions.filter((r) => r.capitalOf !== null)).toHaveLength(n);
    }
  });
  it('M2: leaves eliminated players out of the ranking', () => {
    const g = makeGame();
    g.players[0].eliminated = true;
    g.players[0].influence = 30;
    expect(ranking(g, rules).map((r) => r.player)).not.toContain(0);
  });
});
