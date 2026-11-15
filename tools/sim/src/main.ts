import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEngine, type Engine } from './engine';
import { buildExperiments, type Experiment } from './experiments';
import { playGame, type GameResult, type SimConfig } from './game';
import { hashSeed, makeRng } from './rng';
import { gameRow, seatRows, timeSeries, type SeatRow } from './stats';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

/** Run every game of one experiment. Seeds depend only on the experiment id and game index. */
export function runExperiment(eng: Engine, cfg: SimConfig, exp: Experiment, games = exp.games): GameResult[] {
  const rules = exp.rules ? exp.rules(eng.rules) : eng.rules;
  const out: GameResult[] = [];
  for (let i = 0; i < games; i++) {
    const seed = hashSeed(`${exp.id}#${i}`);
    const seats = exp.seats(makeRng(seed ^ 0x9e3779b9));
    out.push(playGame(eng, cfg, { seats, rules, seed, ...exp.referee }));
  }
  return out;
}

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

function table(head: string[], rows: (string | number | null)[][]): string {
  const line = (cells: (string | number | null)[]) => `| ${cells.map((c) => (c === null ? '—' : String(c))).join(' | ')} |`;
  return [line(head), line(head.map(() => '---')), ...rows.map(line)].join('\n');
}

function seatTable(rows: SeatRow[], first: string): string {
  return table(
    [first, 'assentos', 'vitória', 'índice', 'pontos', 'regiões', 'pop', 'exército', 'influência', 'dinheiro final', 'eliminado', 'conquistou', '1ª conquista (turno)'],
    rows.map((r) => [r.key, r.seats, pct(r.winRate), r.winIndex.toFixed(2), r.score, r.regions, r.pop, r.army, r.influence, r.money, pct(r.eliminated), pct(r.conquered), r.firstConquestTurn]),
  );
}

function behaviourTable(rows: SeatRow[], first: string): string {
  return table(
    [first, 'tratados firmados/partida', 'quebrados/partida', 'dilemas ignorados', 'turnos sem ação', 'turnos com caixa < 10', 'turnos com caixa > 50', 'pico de caixa', 'desertores/partida', 'fome (pop)/partida', 'manutenção ÷ renda', 'superlinear ÷ renda'],
    rows.map((r) => [r.key, r.treatiesSigned, r.treatiesBroken, pct(r.dilemmasIgnored), pct(r.idleTurns), pct(r.moneyLow), pct(r.moneyHigh), r.maxMoney, r.deserters, r.hunger, pct(r.upkeepShare), pct(r.superlinearShare)]),
  );
}

function actionTable(rows: SeatRow[], first: string): string {
  const types = ['treaty', 'breakTreaty', 'tradeInfluence', 'recruit', 'wall', 'move', 'building', 'attack', 'farm'];
  return table([first, ...types], rows.map((r) => [r.key, ...types.map((t) => (r.actions[t] ?? 0).toFixed(2))]));
}

/** Everything the report needs, as plain data (also written to out/results.json). */
function summarise(exp: Experiment, games: GameResult[], campaign: SimConfig['campaign']) {
  const sessions = Array.from({ length: Math.floor(campaign.turns / campaign.sessionLength) }, (_, i) => (i + 1) * campaign.sessionLength);
  return {
    id: exp.id, group: exp.group, title: exp.title, players: exp.players,
    game: gameRow(games),
    byStrategy: seatRows(games, (s) => s.strategy),
    byTrait: seatRows(games, (s) => s.trait),
    byPair: exp.group === 'mix' || exp.group === 'fix-preview' ? seatRows(games, (s) => `${s.strategy} + ${s.trait}`) : [],
    series: exp.group === 'campaign' ? timeSeries(games, sessions) : [],
  };
}
type Summary = ReturnType<typeof summarise>;

function gameTable(list: Summary[]): string {
  return table(
    ['experimento', 'partidas', 'rodadas', 'acabou antes', `líder no T10 vence`, 'eliminações/partida', 'partidas com eliminação', 'impasse (0 ações)', 'rodadas sem ação', 'ações por vez'],
    list.map((s) => [s.id, s.game.games, s.game.rounds, pct(s.game.endedEarly), `${pct(s.game.snowball)} (n=${s.game.snowballSample})`, s.game.eliminations, pct(s.game.gamesWithElimination), pct(s.game.impasses), pct(s.game.quietRounds), s.game.actionsPerPlayerTurn]),
  );
}

function render(all: Summary[], meta: Record<string, string>): string {
  const by = (g: string) => all.filter((s) => s.group === g);
  const out: string[] = [];
  out.push('# Simulador de bots — tabelas', '');
  out.push(Object.entries(meta).map(([k, v]) => `- ${k}: ${v}`).join('\n'), '');
  out.push('`índice` = taxa de vitória ÷ fatia justa (1 ÷ jogadores). 1.00 é equilibrado.', '');

  out.push('## 1. Resumo por experimento', '', gameTable(all), '');

  for (const s of [...by('mix'), ...by('fix-preview')]) {
    out.push(`## ${s.title}`, '', '### Por estratégia', '', seatTable(s.byStrategy, 'estratégia'), '', behaviourTable(s.byStrategy, 'estratégia'), '');
    out.push('### Ações por vez de jogador', '', actionTable(s.byStrategy, 'estratégia'), '');
    out.push('### Por traço', '', seatTable(s.byTrait, 'traço'), '');
    if (s.group === 'mix') out.push('### Estratégia + traço', '', seatTable(s.byPair, 'par'), '');
  }

  out.push('## Traço fixo: qual estratégia vence', '');
  out.push(table(['experimento', 'estratégia', 'assentos', 'vitória', 'índice', 'pontos', 'regiões'],
    by('trait-fixed').flatMap((s) => s.byStrategy.map((r) => [s.id, r.key, r.seats, pct(r.winRate), r.winIndex.toFixed(2), r.score, r.regions]))), '');
  out.push('## Estratégia fixa: qual traço vence', '');
  out.push(table(['experimento', 'traço', 'assentos', 'vitória', 'índice', 'pontos', 'regiões'],
    by('strategy-fixed').flatMap((s) => s.byTrait.map((r) => [s.id, r.key, r.seats, pct(r.winRate), r.winIndex.toFixed(2), r.score, r.regions]))), '');

  out.push('## Guerra: domínio do ataque em massa (4 jogadores)', '');
  out.push(table(['experimento', 'cenário', 'vitória do agressivo', 'índice', 'regiões do agressivo', 'conquistas', 'ataques perdidos', 'eliminações/partida', 'acabou antes'],
    by('war').map((s) => {
      const a = s.byStrategy.find((r) => r.key === 'agressivo')!;
      return [s.id, s.title, pct(a.winRate), a.winIndex.toFixed(2), a.regions, a.conquests, a.attacksLost, s.game.eliminations, pct(s.game.endedEarly)];
    })), '');

  out.push('## Manutenção linear x superlinear (só medição)', '');
  for (const s of by('upkeep')) out.push(`### ${s.title}`, '', seatTable(s.byStrategy, 'estratégia'), '', behaviourTable(s.byStrategy, 'estratégia'), '');

  for (const s of by('campaign')) {
    out.push(`## ${s.title}`, '');
    out.push(table(['fim da sessão (turno)', 'vivos', 'pontos', 'dinheiro', 'maior caixa', 'renda/turno', 'manutenção/turno', 'influência', 'pop', 'exército', 'regiões'],
      s.series.map((t) => [t.round, pct(t.alive), t.score, t.money, t.maxMoney, t.income, t.upkeep, t.influence, t.pop, t.army, t.regions])), '');
    out.push(seatTable(s.byStrategy, 'estratégia'), '', behaviourTable(s.byStrategy, 'estratégia'), '');
  }
  return out.join('\n') + '\n';
}

async function main() {
  const args = process.argv.slice(2);
  const cfg = JSON.parse(readFileSync(join(root, 'config.json'), 'utf8')) as SimConfig & { engineRef: string };
  const engineDir = process.env.ENGINE_DIR ?? join(root, '.engine');
  const eng = await loadEngine(engineDir);
  // Engines from e56251f on start every player with 2 regions (and block chained attacks).
  const probe = eng.api.newGame([0, 1, 2].map((i) => ({ name: `p${i}`, trait: 'mercador' as const })), eng.map, eng.rules);
  const engineHasFixes = probe.regions.filter((r) => r.owner === 0).length >= 2;
  const experiments = buildExperiments(cfg.gamesPerConfig, cfg.campaign.turns, cfg.campaign.players, engineHasFixes);

  if (args.includes('--check')) {
    // Determinism: the same experiment twice must give byte-identical results.
    const exp = experiments.find((e) => e.id === 'mix-4')!;
    const a = JSON.stringify(runExperiment(eng, cfg, exp, 40));
    const b = JSON.stringify(runExperiment(eng, cfg, exp, 40));
    if (a !== b) throw new Error('Simulator is not deterministic');
    console.log(`determinism ok (${createHash('sha256').update(a).digest('hex').slice(0, 16)})`);
    return;
  }

  let engineCommit = 'desconhecido';
  try {
    engineCommit = execFileSync('git', ['-C', engineDir, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch { /* engine dir is not a git checkout */ }
  const only = args.find((a) => a.startsWith('--only='))?.slice(7);
  const selected = only ? experiments.filter((e) => e.id.startsWith(only) || e.group === only) : experiments;
  const summaries: Summary[] = [];
  let total = 0;
  for (const exp of selected) {
    const games = runExperiment(eng, cfg, exp);
    total += games.length;
    summaries.push(summarise(exp, games, cfg.campaign));
    console.log(`${exp.id}: ${games.length} partidas`);
  }
  const json = JSON.stringify(summaries, null, 1);
  const meta = {
    'Motor': `commit ${engineCommit} (src/engine e src/data lidos de outro checkout, sem cópia)`,
    'Correções A1 e A2 no motor': engineHasFixes ? 'sim' : 'não (prévias feitas pelo árbitro do simulador)',
    'Partidas': String(total),
    'Experimentos': String(selected.length),
    'Hash dos resultados': createHash('sha256').update(json).digest('hex').slice(0, 16),
    'Bots': 'usam só applyAction, chooseDilemma e endTurn; sementes fixas; sem relógio nem Math.random',
  };
  const outDir = join(root, 'out', engineCommit);
  mkdirSync(outDir, { recursive: true });
  const suffix = only ? `-${only}` : '';
  writeFileSync(join(outDir, `results${suffix}.json`), json + '\n');
  writeFileSync(join(outDir, `tables${suffix}.md`), render(summaries, meta));
  console.log(`total: ${total} partidas; hash ${meta['Hash dos resultados']}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
