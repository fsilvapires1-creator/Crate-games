import rulesJson from '../data/rules.json';
import mapJson from '../data/map.json';
import dilemmasJson from '../data/dilemmas.json';
import {
  newGame, applyAction, previewAction, endTurn, chooseDilemma, dilemmaFor, exportSave, parseSave, saveFileName,
  income, upkeep, foodBalance, totalArmy, ranking, treatiesOf, buildingCost, PHASES,
  type Action, type GameState, type MapData, type TraitId, type Dilemma, type ReportLine, type Rules,
} from '../engine';
import { t } from './i18n';

const rules = rulesJson as Rules;
const map = mapJson as MapData;
const dilemmas = dilemmasJson.dilemmas as Dilemma[];
const app = document.getElementById('app')!;
const TRAITS = Object.keys(rules.traits) as TraitId[];
const TRAIT_HELP: Record<TraitId, string> = {
  expansionista: 'Edifício 25; influência inicial −1',
  mercador: '+1 renda por cidade; exército inicial 3',
  diplomata: '1 ação diplomática grátis por turno; −1 força por batalha',
  militarista: 'Exército inicial 5; manutenção +floor(exército/4)',
  isolacionista: '+1 comida por cidade; influência inicial −1',
};

/** View-only state. The game state changes only through engine functions. */
interface View {
  game: GameState | null;
  seats: { name: string; trait: TraitId }[];
  selected: string | null;
  target: string | null;
  amount: number;
  pending: Action | null;
  overlay:
    | { kind: 'handoff'; report: ReportLine[]; prevName: string }
    | { kind: 'import'; state: GameState; text: string }
    | { kind: 'error'; text: string }
    | { kind: 'treaty'; with: number }
    | null;
}

const view: View = {
  game: null,
  seats: [
    { name: 'Vallonia', trait: 'expansionista' },
    { name: 'Corvena', trait: 'mercador' },
    { name: 'Sarnia', trait: 'diplomata' },
    { name: 'Almaris', trait: 'militarista' },
  ],
  selected: null,
  target: null,
  amount: 1,
  pending: null,
  overlay: null,
};

const color = (owner: number | null) => (owner === null ? rules.colors.neutral : rules.colors.players[owner]);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const signed = (n: number) => `<span class="delta ${n < 0 ? 'neg' : n > 0 ? 'pos' : ''}">${n > 0 ? '+' : ''}${n}</span>`;

// ---------- Setup screen ----------

function renderSetup(): string {
  const seats = view.seats
    .map(
      (s, i) => `
      <div class="seat">
        <span class="swatch" style="background:${rules.colors.players[i]}"></span>
        <input data-seat-name="${i}" value="${esc(s.name)}" maxlength="20" aria-label="Nome ${i + 1}" />
        <select data-seat-trait="${i}" aria-label="Traço ${i + 1}">
          ${TRAITS.map((tr) => `<option value="${tr}" ${tr === s.trait ? 'selected' : ''}>${rules.traits[tr].name}</option>`).join('')}
        </select>
      </div>`,
    )
    .join('');
  const help = TRAITS.map((tr) => `<div><b>${rules.traits[tr].name}:</b> ${TRAIT_HELP[tr]}</div>`).join('');
  return `
  <div class="setup">
    <div class="card">
      <h1>${t('title')}</h1>
      <p class="muted">${t('subtitle')}</p>
      <h3>${t('players')}</h3>
      ${seats}
      <div class="row" style="margin:8px 0 14px">
        <button data-act="addSeat" ${view.seats.length >= rules.mode.maxPlayers ? 'disabled' : ''}>${t('addPlayer')}</button>
        <button data-act="removeSeat" ${view.seats.length <= rules.mode.minPlayers ? 'disabled' : ''}>${t('removePlayer')}</button>
      </div>
      <div class="trait-help muted">${help}</div>
      <div class="row" style="margin-top:16px">
        <button class="primary" data-act="start">${t('start')}</button>
        <button data-act="import">${t('import')}</button>
      </div>
    </div>
  </div>`;
}

// ---------- Map ----------

const HEX = 62;
const W = Math.sqrt(3) * HEX;
function hexCenter(col: number, row: number) {
  return { x: W * (col + 0.5 * (row & 1)) + W / 2 + 10, y: HEX * 1.5 * row + HEX + 10 };
}
function hexPoints(cx: number, cy: number, size: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + size * Math.cos(a)).toFixed(1)},${(cy + size * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

function patternDefs(): string {
  const p = rules.colors.players;
  const shapes: Record<string, string> = {
    dots: '<circle cx="5" cy="5" r="1.6" fill="#fff" opacity=".55"/>',
    stripes: '<path d="M0 10 L10 0" stroke="#fff" stroke-width="2" opacity=".5"/>',
    cross: '<path d="M5 1 V9 M1 5 H9" stroke="#fff" stroke-width="1.5" opacity=".5"/>',
    waves: '<path d="M0 6 Q2.5 3 5 6 T10 6" stroke="#fff" stroke-width="1.5" fill="none" opacity=".55"/>',
    grid: '<path d="M0 0 H10 V10" stroke="#fff" stroke-width="1.2" fill="none" opacity=".5"/>',
  };
  return p
    .map(
      (c, i) => `<pattern id="pat${i}" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="${c}"/>${shapes[rules.patterns[i]]}</pattern>`,
    )
    .join('');
}

function renderMap(g: GameState): string {
  const sel = g.regions.find((r) => r.id === view.selected);
  const width = W * (map.cols + 0.5) + 20;
  const height = HEX * 1.5 * (map.rows - 1) + HEX * 2 + 20;
  const shapes = g.regions
    .map((r) => {
      const { x, y } = hexCenter(r.col, r.row);
      const fill = r.owner === null ? rules.colors.neutral : `url(#pat${r.owner})`;
      const isSel = r.id === view.selected;
      const isTarget = r.id === view.target;
      const reachable = sel && sel.owner === g.current && sel.adj.includes(r.id);
      const stroke = isSel ? '#FFFFFF' : isTarget ? '#FFD54A' : rules.colors.border;
      const sw = isSel || isTarget ? 5 : 2.5;
      const walls = '▮'.repeat(r.walls);
      const cap = r.capitalOf !== null
        ? `<path d="M${x - 9} ${y - 30} l4 -8 l5 6 l5 -6 l4 8 z" fill="#FFE082" stroke="${rules.colors.border}" stroke-width="1.5"/>`
        : '';
      return `
      <g class="region-shape" data-region="${r.id}">
        <polygon points="${hexPoints(x, y, HEX - 2)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"
          ${reachable && !isTarget ? 'stroke-dasharray="6 4"' : ''}/>
        ${cap}
        <text x="${x}" y="${y - 12}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#fff"
          stroke="${rules.colors.border}" stroke-width="3" paint-order="stroke">${esc(r.name)}</text>
        <g transform="translate(${x - 17},${y - 3})">
          <path d="M0 0 h34 v14 q0 10 -17 14 q-17 -4 -17 -14 z" fill="#FFFDF7" stroke="${rules.colors.border}" stroke-width="1.5"/>
          <text x="17" y="17" text-anchor="middle" font-size="14" font-weight="800" fill="${rules.colors.border}">${r.army}</text>
        </g>
        <text x="${x}" y="${y + 42}" text-anchor="middle" font-size="11" fill="#fff" stroke="${rules.colors.border}"
          stroke-width="2.5" paint-order="stroke">pop ${r.pop} ${walls}${r.farms ? ' ✿' + r.farms : ''}${r.buildings ? ' ⌂' + r.buildings : ''}</text>
      </g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width.toFixed(0)} ${height.toFixed(0)}" role="img" aria-label="Mapa">
    <defs>${patternDefs()}</defs>${shapes}</svg>`;
}

// ---------- Side panels ----------

function actionButton(label: string, action: Action, disabled = false): string {
  return `<button data-pending='${JSON.stringify(action)}' ${disabled ? 'disabled' : ''}>${label}</button>`;
}

function renderRegionPanel(g: GameState): string {
  const r = g.regions.find((x) => x.id === view.selected);
  if (!r) return `<div class="card"><h3>${t('region')}</h3><p class="muted">${t('noRegion')}</p></div>`;
  const ownerName = r.owner === null ? t('neutral') : g.players[r.owner].name;
  const mine = r.owner === g.current;
  let body = `
    <div class="muted">${t('owner')}: <b style="color:${color(r.owner)}">${esc(ownerName)}</b>${r.capitalOf !== null ? ' · ' + t('capital') : ''}</div>
    <div>${t('pop')} ${r.pop} · ${t('army')} ${r.army} · ${t('walls')} ${r.walls} · ${t('farms')} ${r.farms} · ${t('buildings')} ${r.buildings}</div>`;
  if (mine) {
    const c = rules.costs;
    body += `<div class="row" style="margin-top:8px">
      ${actionButton(t('recruit', { n: c.recruitAmount, cost: c.recruit }), { type: 'recruit', region: r.id })}
      ${actionButton(t('wall', { cost: c.wall }), { type: 'wall', region: r.id })}
      ${actionButton(t('farm', { cost: c.farm }), { type: 'farm', region: r.id })}
      ${actionButton(t('building', { cost: buildingCost(g, g.current, rules) }), { type: 'building', region: r.id })}
    </div>`;
    const target = g.regions.find((x) => x.id === view.target);
    if (target) {
      const max = Math.max(1, r.army - 1);
      const amount = Math.min(view.amount, max);
      const kind = target.owner === g.current ? 'move' : 'attack';
      body += `<div class="row" style="margin-top:10px">
        <span>→ <b>${esc(target.name)}</b></span>
        <label>${t('amount')} <input type="number" min="1" max="${max}" value="${amount}" data-amount style="width:64px"/></label>
        ${actionButton(t(kind), { type: kind, from: r.id, to: target.id, amount })}
      </div>`;
    } else {
      body += `<p class="muted" style="margin:8px 0 0">${t('targetHint')}</p>`;
    }
  }
  return `<div class="card"><h3>${t('region')}: ${esc(r.name)}</h3>${body}</div>`;
}

function renderDiplomacy(g: GameState): string {
  const me = g.current;
  const rows = g.players
    .filter((p) => p.id !== me)
    .map((p) => {
      const tr = g.treaties.find((x) => (x.a === me && x.b === p.id) || (x.b === me && x.a === p.id));
      const status = p.eliminated
        ? `<span class="muted">${t('eliminated')}</span>`
        : tr
          ? `${t('treatyLeft', { n: tr.turnsLeft })} ${actionButton(t('breakTreaty'), { type: 'breakTreaty', with: p.id })}`
          : `<button data-treaty="${p.id}">${t('treaty', { cost: rules.costs.treaty })}</button>`;
      return `<tr><td><span style="color:${color(p.id)}">■</span> ${esc(p.name)}</td><td>${status}</td></tr>`;
    })
    .join('');
  return `<div class="card"><h3>${t('diplomacy')}</h3><table>${rows}</table>
    <div class="row" style="margin-top:8px">${actionButton(t('tradeInfluence', { cost: rules.costs.influenceTrade }), { type: 'tradeInfluence' })}</div></div>`;
}

function renderDilemma(g: GameState): string {
  if (g.dilemma?.resolved) return '';
  const d = dilemmaFor(g, dilemmas);
  const opts = d.options.map((o) => `<button class="opt" data-dilemma="${o.id}">${esc(o.label)}</button>`).join('');
  return `<div class="card dilemma"><h3>${t('dilemma')}: ${esc(d.title)}</h3><div>${esc(d.text)}</div>${opts}</div>`;
}

function renderPreview(g: GameState): string {
  if (!view.pending) return '';
  const p = previewAction(g, view.pending, rules);
  const lines = p.ok
    ? `<div>${t('money')} ${signed(p.money)} · ${t('army')} ${signed(p.army)} · ${t('influence')} ${signed(p.influence)}</div>
       ${p.messages.map((m) => `<div>${esc(m)}</div>`).join('')}`
    : `<div class="delta neg">${esc(p.reason ?? '')}</div>`;
  return `<div class="card preview"><h3>${t('preview')}</h3>${lines}
    <div class="row" style="margin-top:8px">
      <button class="primary" data-act="confirm" ${p.ok ? '' : 'disabled'}>${t('confirm')}</button>
      <button data-act="cancel">${t('cancel')}</button></div></div>`;
}

function renderLog(g: GameState): string {
  const items = g.log
    .slice(-40)
    .reverse()
    .map((l) => `<div><span class="muted">T${l.turn}</span> ${l.player !== null ? `<span style="color:${color(l.player)}">■</span> ` : ''}${esc(l.text)}</div>`)
    .join('');
  return `<div class="card"><h3>${t('log')}</h3><div class="log">${items}</div></div>`;
}

function renderTopbar(g: GameState): string {
  const me = g.current;
  const p = g.players[me];
  const food = foodBalance(g, me, rules);
  const phases = PHASES.map(
    (ph, i) => `<span class="${i === g.phaseIndex ? 'on' : i < g.phaseIndex ? 'done' : ''}">${t('phase.' + ph)}</span>`,
  ).join('');
  return `<div class="topbar">
    <div class="who"><span class="swatch" style="background:${color(me)}"></span>${esc(p.name)} <span class="muted" style="color:#BFB6A6">(${rules.traits[p.trait].name})</span></div>
    <div class="stat">${t('turnOf', { turn: g.turn, max: g.maxTurns })}</div>
    <div class="stat">${t('money')} <b>${p.money}</b> <small>(+${income(g, me, rules)} −${upkeep(g, me, rules)})</small></div>
    <div class="stat">${t('army')} <b>${totalArmy(g, me)}</b></div>
    <div class="stat">${t('influence')} <b>${p.influence}</b></div>
    <div class="stat">${t('food')} <b class="${food < 0 ? 'neg' : ''}">${food >= 0 ? '+' : ''}${food}</b></div>
    <div class="stat">${t('actions')} <b>${g.actionsLeft}</b>${g.freeDiplomaticLeft ? ` +${g.freeDiplomaticLeft} ${t('free')}` : ''}</div>
    <div class="spacer"></div>
    <button data-act="export">${t('export')}</button>
    <button data-act="import">${t('import')}</button>
    <button data-act="skip">${t('skipTurn')}</button>
    <button data-act="end" style="background:var(--panel);color:var(--ink)">${t('endTurn')}</button>
  </div>
  <div style="padding:0 12px"><div class="phases">${phases}</div></div>`;
}

function renderGameOver(g: GameState): string {
  const rows = ranking(g, rules)
    .map((r, i) => `<tr><td>${i + 1}º</td><td><span style="color:${color(r.player)}">■</span> ${esc(r.name)}</td><td>${r.score}</td><td>${r.army}</td></tr>`)
    .join('');
  return `<div class="setup"><div class="card"><h1>${t('gameOver')}</h1>
    <table><tr><th>${t('rank')}</th><th></th><th>${t('score')}</th><th>${t('army')}</th></tr>${rows}</table>
    <div class="row" style="margin-top:14px"><button class="primary" data-act="newGame">${t('newGame')}</button>
    <button data-act="export">${t('export')}</button></div></div></div>`;
}

function renderOverlay(g: GameState | null): string {
  const o = view.overlay;
  if (!o) return '';
  if (o.kind === 'error') {
    return `<div class="overlay"><div class="card"><p>${esc(o.text)}</p><button data-act="closeOverlay">OK</button></div></div>`;
  }
  if (o.kind === 'import') {
    const s = o.state;
    return `<div class="overlay"><div class="card"><h3>${t('importConfirm')}</h3>
      <div>${t('turnOf', { turn: s.turn, max: s.maxTurns })} · ${s.players.map((p) => esc(p.name)).join(', ')} · ${s.treaties.length} tratados</div>
      <div class="row" style="margin-top:10px"><button class="primary" data-act="applyImport">${t('load')}</button>
      <button data-act="closeOverlay">${t('cancel')}</button></div></div></div>`;
  }
  if (!g) return '';
  if (o.kind === 'treaty') {
    return `<div class="overlay"><div class="card"><h3>${t('treatyConsent', { name: esc(g.players[o.with].name) })}</h3>
      <div class="row"><button class="primary" data-act="treatyYes">${t('confirm')}</button>
      <button data-act="closeOverlay">${t('cancel')}</button></div></div></div>`;
  }
  const lines = o.report.map((l) => `<tr><td>${esc(l.label)}</td><td>${signed(l.value)}</td></tr>`).join('');
  const next = g.players[g.current];
  return `<div class="overlay"><div class="card">
    <h3>${t('report')} — ${esc(o.prevName)}</h3><table>${lines}</table>
    <h2 style="margin-top:16px;color:${color(next.id)}">${t('nextPlayer', { name: esc(next.name) })}</h2>
    <div class="muted">${t('turnOf', { turn: g.turn, max: g.maxTurns })}${next.missedTurns ? ' · ' + t('missed', { n: next.missedTurns }) : ''}</div>
    <div class="row" style="margin-top:12px"><button class="primary" data-act="begin">${t('begin')}</button></div>
  </div></div>`;
}

function render() {
  const g = view.game;
  if (!g) {
    app.innerHTML = renderSetup() + renderOverlay(null);
    return;
  }
  if (g.over) {
    app.innerHTML = renderGameOver(g) + renderOverlay(g);
    return;
  }
  const treaties = treatiesOf(g, g.current).length;
  app.innerHTML = `${renderTopbar(g)}
    <div class="layout">
      <div>
        <div class="mapbox">${renderMap(g)}</div>
        <p class="muted" style="margin:6px 2px">${t('keys')} · tratados ativos ${treaties}/${rules.caps.activeTreaties}</p>
      </div>
      <div class="side">
        ${renderDilemma(g)}${renderPreview(g)}${renderRegionPanel(g)}${renderDiplomacy(g)}${renderLog(g)}
      </div>
    </div>${renderOverlay(g)}`;
}

// ---------- Commands ----------

function setGame(g: GameState) {
  view.game = g;
  view.pending = null;
}

function confirmPending() {
  const g = view.game;
  if (!g || !view.pending) return;
  const res = applyAction(g, view.pending, rules);
  if (!res.ok) {
    view.overlay = { kind: 'error', text: res.reason ?? '' };
  } else {
    const kind = view.pending.type;
    setGame(res.state);
    if (kind === 'move' || kind === 'attack') view.target = null;
  }
  render();
}

function finishTurn(skipped: boolean) {
  const g = view.game;
  if (!g) return;
  const prevName = g.players[g.current].name;
  const { state, report } = endTurn(g, dilemmas, rules, skipped);
  setGame(state);
  view.selected = null;
  view.target = null;
  view.overlay = state.over ? null : { kind: 'handoff', report, prevName };
  render();
}

function download(name: string, text: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

function pickImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseSave(text, rules.saveVersion);
    view.overlay = parsed.ok ? { kind: 'import', state: parsed.state, text } : { kind: 'error', text: t('importBad', { reason: parsed.reason }) };
    render();
  };
  input.click();
}

function clickRegion(id: string) {
  const g = view.game!;
  const sel = g.regions.find((r) => r.id === view.selected);
  if (sel && sel.owner === g.current && sel.adj.includes(id) && id !== sel.id) {
    view.target = view.target === id ? null : id;
    view.amount = Math.max(1, sel.army - 1);
    view.pending = null;
  } else {
    view.selected = id;
    view.target = null;
    view.pending = null;
  }
  render();
}

app.addEventListener('click', (ev) => {
  const el = (ev.target as HTMLElement).closest('[data-act],[data-pending],[data-region],[data-dilemma],[data-treaty]') as HTMLElement | null;
  if (!el) return;
  const g = view.game;
  if (el.dataset.region && g) return clickRegion(el.dataset.region);
  if (el.dataset.pending) {
    view.pending = JSON.parse(el.dataset.pending) as Action;
    return render();
  }
  if (el.dataset.dilemma && g) {
    setGame(chooseDilemma(g, dilemmaFor(g, dilemmas), el.dataset.dilemma, rules));
    return render();
  }
  if (el.dataset.treaty && g) {
    view.overlay = { kind: 'treaty', with: Number(el.dataset.treaty) };
    return render();
  }
  switch (el.dataset.act) {
    case 'addSeat':
      view.seats.push({ name: `País ${view.seats.length + 1}`, trait: 'mercador' });
      break;
    case 'removeSeat':
      view.seats.pop();
      break;
    case 'start':
      setGame(newGame(view.seats.map((s) => ({ name: s.name.trim() || 'País', trait: s.trait })), map, rules));
      view.overlay = null;
      break;
    case 'newGame':
      view.game = null;
      break;
    case 'confirm':
      return confirmPending();
    case 'cancel':
      view.pending = null;
      break;
    case 'end':
      return finishTurn(false);
    case 'skip':
      return finishTurn(true);
    case 'begin':
    case 'closeOverlay':
      view.overlay = null;
      break;
    case 'treatyYes':
      if (view.overlay?.kind === 'treaty') {
        view.pending = { type: 'treaty', with: view.overlay.with };
        view.overlay = null;
        return confirmPending();
      }
      break;
    case 'export':
      if (g) download(saveFileName(g), exportSave(g));
      return;
    case 'import':
      return pickImport();
    case 'applyImport':
      if (view.overlay?.kind === 'import') {
        setGame(view.overlay.state);
        view.selected = null;
        view.target = null;
        view.overlay = null;
      }
      break;
  }
  render();
});

app.addEventListener('change', (ev) => {
  const el = ev.target as HTMLInputElement | HTMLSelectElement;
  if (el.dataset.seatName) view.seats[Number(el.dataset.seatName)].name = el.value;
  if (el.dataset.seatTrait) view.seats[Number(el.dataset.seatTrait)].trait = el.value as TraitId;
  if ('amount' in el.dataset) {
    view.amount = Math.max(1, Number(el.value) || 1);
    view.pending = null;
    render();
  }
});

document.addEventListener('keydown', (ev) => {
  if (!view.game || view.game.over) return;
  if ((ev.target as HTMLElement).tagName === 'INPUT') return;
  if (ev.key === 'Escape') {
    view.pending = null;
    view.overlay = null;
    view.target = null;
    render();
  } else if (ev.key === 'Enter') {
    if (view.overlay?.kind === 'handoff') {
      view.overlay = null;
      render();
    } else confirmPending();
  } else if (ev.key.toLowerCase() === 'f' && !view.overlay) {
    finishTurn(false);
  }
});

// Expose for automated checks (read-only view of the state).
(window as unknown as { __game: () => GameState | null }).__game = () => view.game;
render();
