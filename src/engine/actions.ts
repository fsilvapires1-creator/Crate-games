import type { Action, ActionResult, GameState, Phase, Region, Rules } from './types';
import { PHASES } from './types';
import { haveTreaty, resolveBattle, treatiesOf } from './formulas';
import { checkElimination } from './turn';

/** Which of the 4 phases an action belongs to. */
export function phaseOf(action: Action): Phase {
  switch (action.type) {
    case 'treaty':
    case 'breakTreaty':
    case 'tradeInfluence':
      return 'diplomacia';
    case 'recruit':
    case 'wall':
    case 'move':
    case 'building':
      return 'recrutamento';
    case 'attack':
      return 'ataque';
    default:
      return 'economia';
  }
}

/** True for actions the Diplomata trait can take for free once per turn (money is still paid). */
export function isDiplomatic(action: Action): boolean {
  return action.type === 'treaty' || action.type === 'breakTreaty' || action.type === 'tradeInfluence';
}

/** Deep copy of the state (it is plain JSON). */
export function clone(state: GameState): GameState {
  return structuredClone(state);
}

function fail(state: GameState, reason: string): ActionResult {
  return { ok: false, reason, state, messages: [] };
}

function region(state: GameState, id: string): Region | undefined {
  return state.regions.find((r) => r.id === id);
}

/** Building cost for a player (Expansionista pays less). */
export function buildingCost(state: GameState, player: number, rules: Rules): number {
  return state.players[player].trait === 'expansionista' ? rules.traits.expansionista.buildingCost : rules.costs.building;
}

/**
 * Apply one action for the current player. Pure: returns a new state and
 * never mutates the input. A failed action returns the input state unchanged.
 */
export function applyAction(input: GameState, action: Action, rules: Rules): ActionResult {
  if (input.over) return fail(input, 'A partida acabou');
  const phase = PHASES.indexOf(phaseOf(action));
  if (phase < input.phaseIndex) {
    return fail(input, `A fase de ${PHASES[phase]} já passou neste turno`);
  }
  const free = isDiplomatic(action) && input.freeDiplomaticLeft > 0;
  if (!free && input.actionsLeft <= 0) return fail(input, 'Sem ações neste turno');

  const state = clone(input);
  const me = state.current;
  const p = state.players[me];
  const c = rules.costs;
  const msgs: string[] = [];

  const ownRegion = (id: string): Region | string => {
    const r = region(state, id);
    if (!r) return 'Região não existe';
    if (r.owner !== me) return 'A região não é sua';
    return r;
  };

  switch (action.type) {
    case 'treaty': {
      const other = state.players[action.with];
      if (!other || other.id === me || other.eliminated) return fail(input, 'País inválido');
      if (action.consent !== true) return fail(input, 'O outro país precisa aceitar o tratado');
      if (haveTreaty(state, me, other.id)) return fail(input, 'Já existe tratado');
      const max = rules.caps.activeTreaties;
      if (treatiesOf(state, me).length >= max || treatiesOf(state, other.id).length >= max) {
        return fail(input, `Máximo de ${max} tratados ativos`);
      }
      if (p.money < c.treaty || other.money < c.treaty) return fail(input, `Os dois lados precisam de ${c.treaty} dinheiro`);
      p.money -= c.treaty;
      other.money -= c.treaty;
      state.treaties.push({ a: me, b: other.id, turnsLeft: rules.treaty.duration, signedTurn: state.turn });
      msgs.push(`${p.name} e ${other.name} assinam tratado por ${rules.treaty.duration} turnos.`);
      break;
    }
    case 'breakTreaty': {
      const idx = state.treaties.findIndex(
        (t) => (t.a === me && t.b === action.with) || (t.b === me && t.a === action.with),
      );
      if (idx < 0) return fail(input, 'Não há tratado com esse país');
      if (p.money < rules.treaty.breakMoney) return fail(input, `Romper exige ${rules.treaty.breakMoney} dinheiro`);
      state.treaties.splice(idx, 1);
      const t = rules.treaty;
      p.influence = Math.max(0, p.influence - t.breakInfluence);
      p.reputation -= t.breakReputation;
      p.money -= t.breakMoney;
      msgs.push(`${p.name} rompe o tratado com ${state.players[action.with].name} e paga a multa.`);
      break;
    }
    case 'tradeInfluence': {
      if (p.money < c.influenceTrade) return fail(input, `Precisa de ${c.influenceTrade} dinheiro`);
      if (p.influence >= rules.caps.influence) return fail(input, 'Influência no teto');
      p.money -= c.influenceTrade;
      p.influence = Math.min(rules.caps.influence, p.influence + c.influenceTradeAmount);
      msgs.push(`${p.name} troca ${c.influenceTrade} dinheiro por ${c.influenceTradeAmount} influência.`);
      break;
    }
    case 'recruit': {
      const r = ownRegion(action.region);
      if (typeof r === 'string') return fail(input, r);
      if (p.money < c.recruit) return fail(input, `Precisa de ${c.recruit} dinheiro`);
      p.money -= c.recruit;
      r.army += c.recruitAmount;
      msgs.push(`${p.name} recruta ${c.recruitAmount} exércitos em ${r.name}.`);
      break;
    }
    case 'wall': {
      const r = ownRegion(action.region);
      if (typeof r === 'string') return fail(input, r);
      if (r.walls >= rules.caps.wallsPerRegion) return fail(input, `Máximo de ${rules.caps.wallsPerRegion} muralhas`);
      if (p.money < c.wall) return fail(input, `Precisa de ${c.wall} dinheiro`);
      p.money -= c.wall;
      r.walls += 1;
      msgs.push(`${p.name} ergue muralha em ${r.name}.`);
      break;
    }
    case 'farm':
    case 'building': {
      const r = ownRegion(action.region);
      if (typeof r === 'string') return fail(input, r);
      if (action.type === 'building' && r.buildings >= rules.caps.buildingsPerRegion) {
        return fail(input, `Máximo de ${rules.caps.buildingsPerRegion} edifícios`);
      }
      const cost = action.type === 'farm' ? c.farm : buildingCost(state, me, rules);
      if (p.money < cost) return fail(input, `Precisa de ${cost} dinheiro`);
      p.money -= cost;
      if (action.type === 'farm') r.farms += 1;
      else r.buildings += 1;
      msgs.push(`${p.name} constrói ${action.type === 'farm' ? 'fazenda' : 'edifício'} em ${r.name}.`);
      break;
    }
    case 'move': {
      const from = ownRegion(action.from);
      if (typeof from === 'string') return fail(input, from);
      const to = ownRegion(action.to);
      if (typeof to === 'string') return fail(input, to);
      if (!from.adj.includes(to.id)) return fail(input, 'Só move para região vizinha');
      if (!Number.isInteger(action.amount) || action.amount < 1 || action.amount > from.army - 1) {
        return fail(input, 'Quantidade inválida (deixe ao menos 1)');
      }
      from.army -= action.amount;
      to.army += action.amount;
      msgs.push(`${p.name} move ${action.amount} exércitos de ${from.name} para ${to.name}.`);
      break;
    }
    case 'attack': {
      const from = ownRegion(action.from);
      if (typeof from === 'string') return fail(input, from);
      const to = region(state, action.to);
      if (!to) return fail(input, 'Região não existe');
      if (to.owner === me) return fail(input, 'A região já é sua');
      if (!from.adj.includes(to.id)) return fail(input, 'Só ataca região vizinha');
      if (state.attackedFrom.includes(from.id)) return fail(input, 'Esse exército já atacou neste turno');
      if (to.owner !== null && haveTreaty(state, me, to.owner)) return fail(input, 'Há tratado ativo: rompa antes');
      if (!Number.isInteger(action.amount) || action.amount < 1 || action.amount > from.army - 1) {
        return fail(input, 'Quantidade inválida (deixe ao menos 1)');
      }
      if (p.money < c.conquest) return fail(input, `Precisa de ${c.conquest} dinheiro para ocupar`);
      const defTrait = to.owner === null ? null : state.players[to.owner].trait;
      const out = resolveBattle(action.amount, p.trait, to.army, to.walls * rules.effects.wallDefense, defTrait, rules);
      state.attackedFrom.push(from.id);
      from.army -= action.amount;
      const defName = to.owner === null ? 'neutros' : state.players[to.owner].name;
      const forces = `força ${out.attackerForce.toFixed(1)} x ${out.defenderForce.toFixed(1)}`;
      if (out.attackerWins) {
        const loser = to.owner;
        to.owner = me;
        to.army = out.attackerLeft;
        state.attackedFrom.push(to.id);
        to.pop = Math.max(rules.battle.minPop, to.pop - rules.battle.conquestPopLoss);
        to.growthClock = 0;
        p.money -= c.conquest;
        msgs.push(`${p.name} conquista ${to.name} de ${defName} (${forces}).`);
        if (loser !== null) msgs.push(...checkElimination(state, loser));
      } else {
        from.army += out.attackerLeft;
        to.army = out.defenderLeft;
        msgs.push(`${p.name} ataca ${to.name} e perde para ${defName} (${forces}).`);
      }
      break;
    }
  }

  if (free) state.freeDiplomaticLeft -= 1;
  else state.actionsLeft -= 1;
  state.phaseIndex = phase;
  for (const m of msgs) state.log.push({ turn: state.turn, player: me, text: m });
  return { ok: true, state, messages: msgs };
}

/** Effect of an action on the current player, without applying it. */
export interface Preview {
  ok: boolean;
  reason?: string;
  money: number;
  army: number;
  influence: number;
  messages: string[];
}

/** Preview an action: same rules as applyAction, on a copy. */
export function previewAction(state: GameState, action: Action, rules: Rules): Preview {
  const res = applyAction(state, action, rules);
  const me = state.current;
  const armyOf = (s: GameState) => s.regions.filter((r) => r.owner === me).reduce((a, r) => a + r.army, 0);
  return {
    ok: res.ok,
    reason: res.reason,
    money: res.state.players[me].money - state.players[me].money,
    army: armyOf(res.state) - armyOf(state),
    influence: res.state.players[me].influence - state.players[me].influence,
    messages: res.messages,
  };
}
