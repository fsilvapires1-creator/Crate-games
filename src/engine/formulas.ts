import type { GameState, Player, Region, Rules } from './types';

/** Regions owned by a player. */
export function ownedRegions(state: GameState, player: number): Region[] {
  return state.regions.filter((r) => r.owner === player);
}

/** Active treaties involving a player. */
export function treatiesOf(state: GameState, player: number) {
  return state.treaties.filter((t) => t.a === player || t.b === player);
}

/** True when the two players have an active treaty. */
export function haveTreaty(state: GameState, a: number, b: number): boolean {
  return state.treaties.some((t) => (t.a === a && t.b === b) || (t.a === b && t.b === a));
}

/** Income of one city: floor(pop / divisor) + trait bonus + buildings. */
export function cityIncome(region: Region, player: Player, rules: Rules): number {
  const base = Math.floor(region.pop / rules.economy.incomePopDivisor);
  const trait = player.trait === 'mercador' ? rules.traits.mercador.incomePerCity : 0;
  return base + trait + region.buildings * rules.effects.buildingIncome;
}

/** Money gained per turn: city income + treaty bonus (per region, per active treaty). */
export function income(state: GameState, player: number, rules: Rules): number {
  const p = state.players[player];
  const regions = ownedRegions(state, player);
  const cities = regions.reduce((s, r) => s + cityIncome(r, p, rules), 0);
  const treatyBonus = treatiesOf(state, player).length * regions.length * rules.treaty.incomePerRegion;
  return cities + treatyBonus;
}

/** Food made in a region: base + floor(pop/3) + farms*3 + Isolacionista bonus. */
export function foodProduced(region: Region, player: Player | null, rules: Rules): number {
  const e = rules.economy;
  const trait = player?.trait === 'isolacionista' ? rules.traits.isolacionista.foodPerCity : 0;
  return e.foodBase + Math.floor(region.pop / e.foodPopDivisor) + region.farms * rules.effects.farmFood + trait;
}

/** Food eaten in a region: ceil(pop / 2). */
export function foodConsumed(region: Region, rules: Rules): number {
  return Math.ceil(region.pop / rules.economy.consumptionPopDivisor);
}

/** National food balance (produced - consumed) over all owned regions. */
export function foodBalance(state: GameState, player: number, rules: Rules): number {
  const p = state.players[player];
  return ownedRegions(state, player).reduce((s, r) => s + foodProduced(r, p, rules) - foodConsumed(r, rules), 0);
}

/** Army upkeep: sum of floor(army/3) per region, plus Militarista floor(total/4). */
export function upkeep(state: GameState, player: number, rules: Rules): number {
  const regions = ownedRegions(state, player);
  let total = regions.reduce((s, r) => s + Math.floor(r.army / rules.economy.upkeepArmyDivisor), 0);
  if (state.players[player].trait === 'militarista') {
    const army = regions.reduce((s, r) => s + r.army, 0);
    total += Math.floor(army / rules.traits.militarista.extraUpkeepArmyDivisor);
  }
  return total;
}

/** Recurring payments due this turn (e.g. alliance tribute). Negative = cost. */
export function recurringMoney(player: Player): number {
  return player.recurring.reduce((s, r) => s + r.money, 0);
}

/** Defense of a region: walls * wallDefense. */
export function regionDefense(region: Region, rules: Rules): number {
  return region.walls * rules.effects.wallDefense;
}

/**
 * Battle force: army * (1 + defense/10). Diplomata loses `battleForcePenalty`
 * from the final force, never below `minForce`.
 */
export function battleForce(army: number, defense: number, trait: string | null, rules: Rules): number {
  let force = army * (1 + defense / rules.battle.defenseDivisor);
  if (trait === 'diplomata') {
    const d = rules.traits.diplomata;
    force = Math.max(d.minForce, force - d.battleForcePenalty);
  }
  return force;
}

/** Losses: min(max(minLoss, floor(n*pct)), n-1). One soldier always survives. */
export function battleLoss(n: number, pct: number, rules: Rules): number {
  if (n <= 0) return 0;
  return Math.min(Math.max(rules.battle.minLoss, Math.floor(n * pct)), n - 1);
}

/** Result of one battle, before conquest is applied. */
export interface BattleOutcome {
  attackerForce: number;
  defenderForce: number;
  attackerWins: boolean;
  attackerLeft: number;
  defenderLeft: number;
}

/** Resolve a battle. Ties go to the defender. */
export function resolveBattle(
  attackers: number,
  attackerTrait: string | null,
  defenders: number,
  defense: number,
  defenderTrait: string | null,
  rules: Rules,
): BattleOutcome {
  const attackerForce = battleForce(attackers, 0, attackerTrait, rules);
  const defenderForce = battleForce(defenders, defense, defenderTrait, rules);
  const attackerWins = attackerForce > defenderForce;
  const b = rules.battle;
  const aPct = attackerWins ? b.winnerLossPct : b.loserLossPct;
  const dPct = attackerWins ? b.loserLossPct : b.winnerLossPct;
  return {
    attackerForce,
    defenderForce,
    attackerWins,
    attackerLeft: attackers - battleLoss(attackers, aPct, rules),
    defenderLeft: defenders - battleLoss(defenders, dPct, rules),
  };
}

/** Armies that desert when upkeep exceeds money: one per `desertionPerMissing` missing. */
export function desertions(missing: number, rules: Rules): number {
  return missing <= 0 ? 0 : Math.floor(missing / rules.economy.desertionPerMissing);
}

/** Score in 20-turn mode: own capital x3 + conquered capitals x1 + floor(pop/4) + influence (capped). */
export function score(state: GameState, player: number, rules: Rules): number {
  const regions = ownedRegions(state, player);
  const s = rules.score;
  const capitals = regions.reduce((sum, r) => {
    if (r.capitalOf === null) return sum;
    return sum + (r.capitalOf === player ? s.ownCapital : s.conqueredCapital);
  }, 0);
  const pop = regions.reduce((sum, r) => sum + r.pop, 0);
  const inf = Math.min(state.players[player].influence, rules.caps.influence);
  return capitals + Math.floor(pop / s.popDivisor) + inf;
}

/** Total army of a player (tie-breaker). */
export function totalArmy(state: GameState, player: number): number {
  return ownedRegions(state, player).reduce((s, r) => s + r.army, 0);
}

/** Final ranking: score desc, then army desc. */
export function ranking(state: GameState, rules: Rules) {
  return state.players
    .map((p) => ({ player: p.id, name: p.name, score: score(state, p.id, rules), army: totalArmy(state, p.id) }))
    .sort((x, y) => y.score - x.score || y.army - x.army);
}
