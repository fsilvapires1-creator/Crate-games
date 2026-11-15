# tools/sim — simulador de bots do Jogo de Países

Joga partidas inteiras com bots usando o motor de regras real (`src/engine`), para
medir balanceamento sem playtest humano. Não copia nem altera o motor: ele é lido de
outro checkout (branch da sala de Código), apontado por `ENGINE_DIR`.

## Rodar

```bash
tools/sim/run.sh            # motor do commit em config.json (engineRef)
tools/sim/run.sh <commit>   # outro commit ou branch
cd tools/sim && ENGINE_DIR=/caminho/do/checkout npm run sim -- --only=mix-4
cd tools/sim && ENGINE_DIR=/caminho/do/checkout npm run check   # determinismo
```

Saída em `out/<commit>/`: `results.json` (agregados) e `tables.md` (todas as tabelas).
`REPORT.md` é a análise escrita do último motor testado.

## Peças

- `config.json`: todos os valores do simulador e dos bots (nenhum número no código).
- `src/engine.ts`: carrega o motor e os dados de outro checkout.
- `src/bots.ts`: 6 estratégias; os bots só devolvem intenções.
- `src/game.ts`: uma partida; aplica as intenções com `applyAction` e mede tudo.
- `src/experiments.ts`: lista de experimentos (mistura, traço fixo, estratégia fixa, guerra, manutenção, campanha).
- `src/stats.ts`, `src/main.ts`: agregação e tabelas.

O árbitro do simulador tem três chaves de experimento (`noChain`, `secondStartRegion`,
`chargeSuperlinear`). Elas só servem para prever regras que o motor ainda não tem e são
desligadas sozinhas quando o motor já as traz.
