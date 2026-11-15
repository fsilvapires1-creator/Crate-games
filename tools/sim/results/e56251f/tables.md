# Simulador de bots — tabelas

- Motor: commit e56251f (src/engine e src/data lidos de outro checkout, sem cópia)
- Correções A1 e A2 no motor: sim
- Partidas: 13200
- Experimentos: 46
- Hash dos resultados: 0daa326f67d3e0be
- Bots: usam só applyAction, chooseDilemma e endTurn; sementes fixas; sem relógio nem Math.random

`índice` = taxa de vitória ÷ fatia justa (1 ÷ jogadores). 1.00 é equilibrado.

## 1. Resumo por experimento

| experimento | partidas | rodadas | acabou antes | líder no T10 vence | eliminações/partida | partidas com eliminação | impasse (0 ações) | rodadas sem ação | ações por vez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mix-3 | 1000 | 20 | 0.7% | 73.8% (n=1000) | 0.11 | 10.1% | 0.2% | 48.2% | 0.34 |
| mix-4 | 1000 | 20 | 0.3% | 71.4% (n=1000) | 0.21 | 17.1% | 0.0% | 33.8% | 0.38 |
| mix-5 | 1000 | 20 | 0.1% | 68.8% (n=1000) | 0.25 | 21.3% | 0.0% | 28.3% | 0.35 |
| trait-expansionista-3 | 200 | 20 | 0.0% | 74.5% (n=200) | 0.08 | 7.5% | 0.0% | 47.7% | 0.34 |
| trait-expansionista-4 | 200 | 20 | 0.0% | 64.5% (n=200) | 0.14 | 14.0% | 0.0% | 30.8% | 0.39 |
| trait-expansionista-5 | 200 | 20 | 0.0% | 49.5% (n=200) | 0.16 | 16.0% | 0.0% | 24.9% | 0.34 |
| trait-mercador-3 | 200 | 19.9 | 2.0% | 87.0% (n=200) | 0.2 | 18.0% | 0.0% | 31.5% | 0.49 |
| trait-mercador-4 | 200 | 20 | 0.5% | 78.0% (n=200) | 0.41 | 33.5% | 0.0% | 18.8% | 0.55 |
| trait-mercador-5 | 200 | 20 | 0.0% | 63.5% (n=200) | 0.56 | 50.0% | 0.0% | 12.4% | 0.52 |
| trait-diplomata-3 | 200 | 20 | 0.0% | 73.5% (n=200) | 0.24 | 24.0% | 0.0% | 50.9% | 0.33 |
| trait-diplomata-4 | 200 | 20 | 0.0% | 78.0% (n=200) | 0.28 | 28.5% | 0.0% | 35.3% | 0.38 |
| trait-diplomata-5 | 200 | 20 | 0.0% | 67.0% (n=200) | 0.23 | 22.5% | 0.0% | 27.1% | 0.34 |
| trait-militarista-3 | 200 | 20 | 0.0% | 81.0% (n=200) | 0 | 0.0% | 0.0% | 68.2% | 0.2 |
| trait-militarista-4 | 200 | 20 | 0.0% | 70.0% (n=200) | 0 | 0.0% | 0.0% | 59.8% | 0.22 |
| trait-militarista-5 | 200 | 20 | 0.0% | 70.5% (n=200) | 0 | 0.0% | 0.0% | 58.8% | 0.18 |
| trait-isolacionista-3 | 200 | 20 | 0.0% | 74.0% (n=200) | 0.1 | 10.0% | 0.0% | 43.7% | 0.38 |
| trait-isolacionista-4 | 200 | 20 | 0.0% | 76.5% (n=200) | 0.21 | 20.0% | 0.0% | 28.6% | 0.4 |
| trait-isolacionista-5 | 200 | 20 | 0.0% | 52.5% (n=200) | 0.2 | 19.5% | 0.0% | 23.1% | 0.36 |
| strategy-agressivo-3 | 200 | 20 | 0.0% | 91.0% (n=200) | 0.05 | 5.0% | 0.0% | 49.7% | 0.34 |
| strategy-agressivo-4 | 200 | 20 | 0.0% | 96.5% (n=200) | 0.14 | 12.5% | 0.0% | 40.1% | 0.33 |
| strategy-agressivo-5 | 200 | 20 | 0.0% | 75.5% (n=200) | 0.24 | 23.0% | 0.0% | 41.6% | 0.3 |
| strategy-mercador-3 | 200 | 20 | 0.0% | 58.0% (n=200) | 0 | 0.0% | 0.0% | 28.2% | 0.54 |
| strategy-mercador-4 | 200 | 20 | 0.0% | 16.5% (n=200) | 0 | 0.0% | 0.0% | 21.0% | 0.58 |
| strategy-mercador-5 | 200 | 20 | 0.0% | 35.5% (n=200) | 0 | 0.0% | 0.0% | 16.2% | 0.52 |
| strategy-tartaruga-3 | 200 | 20 | 0.0% | 10.5% (n=200) | 0 | 0.0% | 0.0% | 32.3% | 0.42 |
| strategy-tartaruga-4 | 200 | 20 | 0.0% | 16.5% (n=200) | 0 | 0.0% | 0.0% | 22.9% | 0.42 |
| strategy-tartaruga-5 | 200 | 20 | 0.0% | 11.5% (n=200) | 0 | 0.0% | 0.0% | 18.6% | 0.43 |
| strategy-oportunista-3 | 200 | 20 | 0.0% | 66.5% (n=200) | 0 | 0.0% | 0.0% | 47.8% | 0.34 |
| strategy-oportunista-4 | 200 | 20 | 0.0% | 91.5% (n=200) | 0 | 0.0% | 0.0% | 38.8% | 0.33 |
| strategy-oportunista-5 | 200 | 20 | 0.0% | 67.0% (n=200) | 0 | 0.0% | 0.0% | 33.1% | 0.32 |
| strategy-traidor-3 | 200 | 20 | 0.0% | 83.0% (n=200) | 0 | 0.0% | 0.0% | 28.9% | 0.53 |
| strategy-traidor-4 | 200 | 20 | 0.0% | 60.5% (n=200) | 0.03 | 3.0% | 0.0% | 20.1% | 0.59 |
| strategy-traidor-5 | 200 | 20 | 0.0% | 62.0% (n=200) | 0.05 | 5.0% | 0.0% | 16.0% | 0.47 |
| strategy-passivo-3 | 200 | 20 | 0.0% | 60.0% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| strategy-passivo-4 | 200 | 20 | 0.0% | 30.5% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| strategy-passivo-5 | 200 | 20 | 0.0% | 0.0% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| war-turtles-walls-nochain | 200 | 20 | 0.0% | 49.5% (n=200) | 0 | 0.0% | 0.0% | 31.7% | 0.38 |
| war-turtles-nowalls-nochain | 200 | 20 | 0.0% | 67.0% (n=200) | 0.01 | 1.0% | 0.0% | 30.7% | 0.38 |
| war-field-walls-nochain | 200 | 20 | 0.0% | 68.0% (n=200) | 0.01 | 0.5% | 0.0% | 27.7% | 0.41 |
| war-field-nowalls-nochain | 200 | 20 | 0.0% | 63.5% (n=200) | 0.02 | 1.5% | 0.0% | 27.4% | 0.42 |
| war-passive-walls-nochain | 200 | 19.3 | 20.0% | 100.0% (n=200) | 1.23 | 67.0% | 0.0% | 57.0% | 0.18 |
| war-passive-nowalls-nochain | 200 | 19.2 | 22.0% | 100.0% (n=200) | 1.21 | 64.0% | 0.0% | 56.8% | 0.18 |
| upkeep-linear | 1000 | 20 | 0.0% | 72.0% (n=1000) | 0.2 | 16.2% | 0.0% | 34.1% | 0.38 |
| upkeep-superlinear | 1000 | 20 | 0.2% | 72.0% (n=1000) | 0.13 | 11.7% | 0.3% | 53.4% | 0.26 |
| campaign-mix | 200 | 56.5 | 15.5% | 63.0% (n=200) | 0.71 | 35.0% | 0.0% | 47.7% | 0.26 |
| campaign-peace | 200 | 60 | 0.0% | 35.5% (n=200) | 0 | 0.0% | 0.0% | 37.4% | 0.34 |

## Mistura livre, 3 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 505 | 46.9% | 1.41 | 26.4 | 3.3 | 30.6 | 28.5 | 16 | 9.6 | 0.4% | 100.0% | 1 |
| mercador | 473 | 46.5% | 1.40 | 31.1 | 2.05 | 20.5 | 18.9 | 23.3 | 11.3 | 0.6% | 24.1% | 3 |
| traidor | 497 | 46.1% | 1.38 | 29.6 | 2.94 | 28.3 | 28.3 | 19.7 | 10.4 | 0.0% | 80.5% | 2 |
| oportunista | 507 | 39.6% | 1.19 | 27.8 | 2.83 | 27 | 28.5 | 18.4 | 8.4 | 1.0% | 90.7% | 1.8 |
| tartaruga | 502 | 22.1% | 0.66 | 27.6 | 1.8 | 18.7 | 17.1 | 20.2 | 8.1 | 0.8% | 0.0% | — |
| passivo | 516 | 0.4% | 0.01 | 6 | 1.47 | 15.4 | 5.9 | 0 | 153.3 | 19.4% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0 | 0 | 0.0% | 67.3% | 57.7% | 0.0% | 19.9 | 0.45 | 1.96 | 66.7% | 133.1% |
| mercador | 3.06 | 0 | 0.0% | 68.1% | 23.4% | 0.4% | 40.9 | 0.2 | 2.56 | 44.5% | 73.9% |
| traidor | 2.88 | 0.34 | 0.0% | 66.5% | 27.3% | 1.7% | 38 | 0.18 | 2.57 | 49.5% | 93.0% |
| oportunista | 1.39 | 0 | 0.0% | 73.6% | 40.8% | 0.4% | 31.4 | 0.26 | 2.14 | 58.4% | 108.7% |
| tartaruga | 2.6 | 0 | 0.0% | 75.4% | 27.1% | 0.0% | 27.5 | 0.12 | 2.32 | 46.2% | 73.6% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 153.3 | 0 | 2.34 | 27.9% | 23.5% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0.00 | 0.00 | 0.05 | 0.22 | 0.00 | 0.09 | 0.00 | 0.08 | 0.00 |
| mercador | 0.10 | 0.00 | 0.26 | 0.05 | 0.00 | 0.00 | 0.01 | 0.01 | 0.00 |
| traidor | 0.09 | 0.02 | 0.14 | 0.18 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.11 | 0.20 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| tartaruga | 0.06 | 0.00 | 0.11 | 0.03 | 0.13 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 566 | 48.1% | 1.44 | 27.2 | 2.59 | 24.5 | 23.5 | 18.3 | 43.8 | 5.3% | 48.6% | 1.9 |
| isolacionista | 620 | 34.8% | 1.05 | 25.1 | 2.36 | 25.6 | 20.7 | 16.1 | 38.4 | 3.4% | 49.0% | 1.8 |
| expansionista | 589 | 34.1% | 1.02 | 24.8 | 2.39 | 22.8 | 21.4 | 16.5 | 32.7 | 3.1% | 48.2% | 1.7 |
| diplomata | 610 | 31.3% | 0.94 | 24.3 | 2.27 | 21.8 | 21.2 | 16.3 | 33.8 | 4.4% | 43.6% | 1.8 |
| militarista | 615 | 19.5% | 0.59 | 21.9 | 2.4 | 22.5 | 19.3 | 13.7 | 23.2 | 2.9% | 56.9% | 1.3 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo + mercador | 94 | 76.6% | 2.30 | 32.7 | 4.11 | 36.9 | 34 | 20.2 | 15.9 | 0.0% | 100.0% | 1 |
| mercador + mercador | 87 | 64.4% | 1.93 | 34.3 | 1.87 | 18.6 | 17.5 | 27 | 18.8 | 0.0% | 6.9% | 1.7 |
| traidor + mercador | 94 | 59.6% | 1.79 | 31.8 | 3.38 | 31.7 | 34.6 | 20.8 | 14.8 | 0.0% | 86.2% | 2.5 |
| oportunista + mercador | 104 | 54.8% | 1.64 | 30.7 | 3 | 28.2 | 34.4 | 20.9 | 10.7 | 0.0% | 90.4% | 2.3 |
| agressivo + diplomata | 94 | 50.0% | 1.50 | 26.9 | 3.24 | 30.3 | 30.2 | 16.5 | 8.2 | 0.0% | 100.0% | 1 |
| mercador + isolacionista | 94 | 50.0% | 1.50 | 33.1 | 2.27 | 25.1 | 19.9 | 24 | 14.5 | 0.0% | 40.4% | 3.2 |
| traidor + expansionista | 96 | 50.0% | 1.50 | 29.3 | 2.81 | 26.7 | 28.6 | 19.7 | 10.2 | 0.0% | 74.0% | 2.1 |
| agressivo + expansionista | 103 | 46.6% | 1.40 | 25.8 | 3.11 | 28.4 | 27.5 | 16.1 | 8.7 | 1.0% | 100.0% | 1 |
| agressivo + isolacionista | 100 | 46.0% | 1.38 | 26 | 3.05 | 30.4 | 27.4 | 15.9 | 10.2 | 1.0% | 100.0% | 1 |
| traidor + isolacionista | 100 | 46.0% | 1.38 | 30.2 | 2.75 | 29.4 | 27 | 20.1 | 11.3 | 0.0% | 73.0% | 2 |
| mercador + expansionista | 99 | 45.5% | 1.36 | 31.1 | 2.02 | 19.8 | 19.2 | 23.2 | 9.9 | 0.0% | 14.1% | 3.2 |
| traidor + diplomata | 110 | 45.5% | 1.36 | 29.7 | 2.78 | 26.3 | 28.1 | 20.4 | 9.2 | 0.0% | 75.5% | 2.5 |
| oportunista + isolacionista | 102 | 44.1% | 1.32 | 28.7 | 2.87 | 29.8 | 28.6 | 18.6 | 9.7 | 0.0% | 91.2% | 2 |
| oportunista + expansionista | 102 | 42.2% | 1.26 | 28.3 | 2.91 | 27.5 | 28.3 | 18.7 | 8.7 | 1.0% | 94.1% | 1.8 |
| mercador + diplomata | 91 | 41.8% | 1.25 | 30.2 | 1.85 | 18.2 | 19.5 | 22.9 | 7.9 | 2.2% | 7.7% | 1.6 |
| oportunista + diplomata | 97 | 38.1% | 1.14 | 27.5 | 2.64 | 24.9 | 28.1 | 18.7 | 8.6 | 2.1% | 84.5% | 2 |
| tartaruga + mercador | 84 | 36.9% | 1.11 | 31 | 1.8 | 18 | 15.8 | 23.8 | 10.8 | 2.4% | 0.0% | — |
| mercador + militarista | 102 | 33.3% | 1.00 | 27.6 | 2.2 | 20.7 | 18.1 | 19.9 | 6.4 | 1.0% | 48.0% | 3.1 |
| traidor + militarista | 97 | 29.9% | 0.90 | 27.2 | 3 | 27.6 | 23.4 | 17.4 | 6.6 | 0.0% | 94.8% | 1.1 |
| tartaruga + isolacionista | 108 | 27.8% | 0.83 | 29 | 1.87 | 22 | 17.5 | 20.7 | 9.7 | 0.0% | 0.0% | — |
| agressivo + militarista | 114 | 21.1% | 0.63 | 21.8 | 3.07 | 28 | 24.6 | 12.1 | 5.8 | 0.0% | 100.0% | 1 |
| oportunista + militarista | 102 | 18.6% | 0.56 | 23.9 | 2.71 | 24.7 | 23 | 15.1 | 4.3 | 2.0% | 93.1% | 1 |
| tartaruga + expansionista | 95 | 17.9% | 0.54 | 27.6 | 1.81 | 18 | 17.1 | 20.4 | 7.7 | 1.1% | 0.0% | — |
| tartaruga + diplomata | 109 | 17.4% | 0.52 | 27.3 | 1.73 | 17.2 | 17.3 | 20.4 | 7.5 | 0.9% | 0.0% | — |
| tartaruga + militarista | 106 | 13.2% | 0.40 | 23.8 | 1.8 | 17.8 | 17.8 | 16.6 | 5.1 | 0.0% | 0.0% | — |
| passivo + isolacionista | 116 | 1.7% | 0.05 | 6.9 | 1.52 | 18.2 | 6.1 | 0 | 157.2 | 17.2% | 0.0% | — |
| passivo + diplomata | 109 | 0.0% | 0.00 | 5.8 | 1.46 | 14.6 | 5.8 | 0 | 151.3 | 20.2% | 0.0% | — |
| passivo + expansionista | 94 | 0.0% | 0.00 | 6.1 | 1.56 | 15.6 | 6.3 | 0 | 157 | 16.0% | 0.0% | — |
| passivo + mercador | 103 | 0.0% | 0.00 | 5.3 | 1.34 | 13.4 | 4 | 0 | 177.3 | 27.2% | 0.0% | — |
| passivo + militarista | 94 | 0.0% | 0.00 | 6 | 1.5 | 15 | 7.5 | 0 | 120.5 | 16.0% | 0.0% | — |

## Mistura livre, 4 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 664 | 41.6% | 1.66 | 31.9 | 2.18 | 21.4 | 19.1 | 24 | 14.1 | 1.2% | 39.2% | 2.6 |
| traidor | 680 | 35.7% | 1.43 | 30 | 2.99 | 28.6 | 28 | 20.1 | 12.2 | 1.5% | 89.0% | 2.1 |
| agressivo | 647 | 32.3% | 1.29 | 26.5 | 3.44 | 31.6 | 30 | 15.8 | 9.9 | 0.6% | 100.0% | 1 |
| oportunista | 672 | 27.1% | 1.08 | 27.5 | 2.86 | 27 | 28.3 | 18.1 | 9.2 | 1.3% | 94.8% | 1.6 |
| tartaruga | 688 | 13.1% | 0.52 | 27.9 | 1.84 | 18.9 | 17.2 | 20.4 | 9.2 | 0.6% | 0.0% | — |
| passivo | 649 | 0.0% | 0.00 | 5.4 | 1.31 | 13.6 | 5.2 | 0 | 145.2 | 26.5% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 4.11 | 0 | 0.0% | 64.7% | 18.7% | 0.9% | 42.6 | 0.13 | 2.76 | 39.8% | 63.7% |
| traidor | 4.1 | 0.56 | 0.0% | 61.0% | 20.9% | 2.6% | 41.3 | 0.2 | 2.73 | 43.4% | 78.1% |
| agressivo | 0 | 0 | 0.0% | 67.9% | 58.6% | 0.0% | 18.9 | 0.48 | 1.92 | 64.6% | 121.4% |
| oportunista | 1.67 | 0 | 0.0% | 73.0% | 41.7% | 0.8% | 32.2 | 0.3 | 2.08 | 57.2% | 103.5% |
| tartaruga | 3.62 | 0 | 0.0% | 72.4% | 22.5% | 0.0% | 29.9 | 0.13 | 2.68 | 42.0% | 66.9% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 145.2 | 0 | 2.11 | 28.3% | 23.6% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 0.12 | 0.00 | 0.27 | 0.06 | 0.00 | 0.00 | 0.01 | 0.02 | 0.00 |
| traidor | 0.13 | 0.03 | 0.17 | 0.19 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.05 | 0.25 | 0.00 | 0.06 | 0.00 | 0.09 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.11 | 0.21 | 0.00 | 0.00 | 0.00 | 0.07 | 0.00 |
| tartaruga | 0.08 | 0.00 | 0.12 | 0.03 | 0.14 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 800 | 37.3% | 1.49 | 27.2 | 2.63 | 24.6 | 23.2 | 18.5 | 44.3 | 7.3% | 47.8% | 1.7 |
| isolacionista | 825 | 30.7% | 1.23 | 26.3 | 2.49 | 26.6 | 21.3 | 17 | 36 | 5.1% | 56.6% | 1.9 |
| expansionista | 764 | 24.0% | 0.96 | 25.1 | 2.47 | 23.3 | 22 | 16.7 | 30.2 | 4.3% | 53.5% | 1.7 |
| diplomata | 805 | 21.1% | 0.84 | 24.7 | 2.27 | 21.4 | 21.2 | 16.8 | 30.6 | 5.5% | 46.8% | 1.7 |
| militarista | 806 | 11.9% | 0.48 | 21.6 | 2.33 | 21.7 | 19 | 13.7 | 22.3 | 3.7% | 63.8% | 1.4 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo + mercador | 126 | 60.3% | 2.41 | 33.4 | 4.52 | 40.1 | 38.3 | 20.2 | 16.2 | 0.0% | 100.0% | 1 |
| mercador + isolacionista | 137 | 56.9% | 2.28 | 34.8 | 2.45 | 26.4 | 19.3 | 25.6 | 21.7 | 0.0% | 64.2% | 2.8 |
| oportunista + mercador | 125 | 50.4% | 2.02 | 31.7 | 3.27 | 30.2 | 34.9 | 21.5 | 12.4 | 0.8% | 94.4% | 2 |
| mercador + mercador | 118 | 47.5% | 1.90 | 34.2 | 1.9 | 18.5 | 17.7 | 27.1 | 20.2 | 2.5% | 13.6% | 2.2 |
| traidor + mercador | 141 | 47.5% | 1.90 | 31.9 | 3.3 | 30.9 | 32.5 | 21.3 | 18.6 | 2.1% | 86.5% | 2.1 |
| traidor + isolacionista | 130 | 45.4% | 1.82 | 31.8 | 3.07 | 32.3 | 27.5 | 20.9 | 14.5 | 2.3% | 86.9% | 2.5 |
| mercador + expansionista | 130 | 37.7% | 1.51 | 30.8 | 2.05 | 19.7 | 18.7 | 23.3 | 13 | 1.5% | 28.5% | 1.6 |
| agressivo + isolacionista | 138 | 37.0% | 1.48 | 26.2 | 3.24 | 31.9 | 29.6 | 15.7 | 10.2 | 0.7% | 100.0% | 1 |
| traidor + expansionista | 128 | 35.9% | 1.44 | 29.6 | 3.02 | 28.2 | 28.6 | 19.8 | 11.4 | 0.8% | 88.3% | 2.4 |
| oportunista + isolacionista | 135 | 34.1% | 1.36 | 29.5 | 3.02 | 31.2 | 28.9 | 19.2 | 12.1 | 0.7% | 94.8% | 1.6 |
| mercador + diplomata | 144 | 33.3% | 1.33 | 30.7 | 1.91 | 18.6 | 19.6 | 23.4 | 8.9 | 2.1% | 15.3% | 2.2 |
| mercador + militarista | 135 | 33.3% | 1.33 | 29.4 | 2.56 | 23.6 | 19.9 | 21 | 7.9 | 0.0% | 71.9% | 3 |
| traidor + diplomata | 145 | 33.1% | 1.32 | 30 | 2.81 | 26.1 | 28 | 20.9 | 10.2 | 1.4% | 84.1% | 2.4 |
| agressivo + diplomata | 117 | 31.6% | 1.26 | 26.9 | 3.41 | 30.7 | 30.4 | 16.2 | 9.3 | 0.9% | 100.0% | 1 |
| oportunista + expansionista | 139 | 30.2% | 1.21 | 28.4 | 3.07 | 28.6 | 29.7 | 18.6 | 10.1 | 2.9% | 95.0% | 1.6 |
| tartaruga + mercador | 139 | 25.9% | 1.04 | 31.5 | 1.83 | 18.1 | 15.5 | 24.3 | 12.4 | 0.0% | 0.0% | — |
| agressivo + expansionista | 127 | 23.6% | 0.94 | 25.3 | 3.2 | 29 | 28.9 | 15.4 | 9.4 | 0.0% | 100.0% | 1 |
| traidor + militarista | 136 | 16.9% | 0.68 | 26.7 | 2.76 | 25.4 | 23.1 | 17.7 | 6.2 | 0.7% | 99.3% | 1 |
| oportunista + diplomata | 130 | 16.2% | 0.65 | 26 | 2.51 | 23.1 | 27.4 | 17.7 | 8 | 0.8% | 89.2% | 1.7 |
| tartaruga + isolacionista | 148 | 12.8% | 0.51 | 29.2 | 1.9 | 22.6 | 17.6 | 20.7 | 11.2 | 0.0% | 0.0% | — |
| tartaruga + expansionista | 131 | 12.2% | 0.49 | 27.6 | 1.89 | 18.6 | 17.6 | 20.2 | 9.4 | 0.0% | 0.0% | — |
| tartaruga + diplomata | 138 | 11.6% | 0.46 | 28.2 | 1.85 | 18.2 | 17.6 | 20.9 | 9.2 | 0.7% | 0.0% | — |
| agressivo + militarista | 139 | 10.8% | 0.43 | 21.4 | 2.9 | 26.6 | 23.7 | 11.9 | 4.8 | 1.4% | 100.0% | 1 |
| oportunista + militarista | 143 | 7.0% | 0.28 | 22.2 | 2.48 | 22.3 | 21.2 | 14.1 | 3.8 | 1.4% | 100.0% | 1 |
| tartaruga + militarista | 132 | 2.3% | 0.09 | 22.5 | 1.71 | 16.7 | 17.6 | 15.8 | 3.7 | 2.3% | 0.0% | — |
| passivo + diplomata | 131 | 0.0% | 0.00 | 5.1 | 1.25 | 12.5 | 5 | 0.1 | 141.2 | 27.5% | 0.0% | — |
| passivo + expansionista | 109 | 0.0% | 0.00 | 5.7 | 1.41 | 14.1 | 5.7 | 0 | 147.9 | 23.9% | 0.0% | — |
| passivo + isolacionista | 137 | 0.0% | 0.00 | 6 | 1.32 | 15.9 | 5.3 | 0 | 146.8 | 27.0% | 0.0% | — |
| passivo + mercador | 151 | 0.0% | 0.00 | 4.7 | 1.17 | 11.7 | 3.5 | 0 | 166.4 | 33.8% | 0.0% | — |
| passivo + militarista | 121 | 0.0% | 0.00 | 5.8 | 1.42 | 14.2 | 7.1 | 0 | 118.7 | 18.2% | 0.0% | — |

## Mistura livre, 5 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 857 | 32.3% | 1.62 | 28.9 | 2.01 | 20 | 22.4 | 21.5 | 9.5 | 1.1% | 23.9% | 2 |
| agressivo | 845 | 26.5% | 1.33 | 25.1 | 2.98 | 28.8 | 31.4 | 15 | 7.9 | 1.9% | 99.9% | 1 |
| traidor | 801 | 26.6% | 1.33 | 27.3 | 2.84 | 27.4 | 29.9 | 17.8 | 10.7 | 1.5% | 75.2% | 2.5 |
| oportunista | 840 | 19.8% | 0.99 | 24.2 | 2.62 | 24.6 | 29.6 | 15.8 | 7 | 1.0% | 91.5% | 1.6 |
| tartaruga | 807 | 14.9% | 0.74 | 26.7 | 1.78 | 18.2 | 18.1 | 19.7 | 8.5 | 1.6% | 0.0% | — |
| passivo | 850 | 0.0% | 0.00 | 5.3 | 1.3 | 13.5 | 5.2 | 0.1 | 142.1 | 22.9% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 3.82 | 0 | 0.0% | 68.6% | 28.0% | 0.3% | 39.5 | 0.32 | 2.46 | 48.7% | 91.6% |
| agressivo | 0 | 0 | 0.0% | 69.7% | 64.1% | 0.0% | 16.8 | 0.38 | 1.85 | 69.5% | 139.1% |
| traidor | 3.66 | 0.46 | 0.0% | 64.2% | 33.5% | 1.7% | 37.3 | 0.34 | 2.46 | 50.4% | 97.3% |
| oportunista | 1.42 | 0 | 0.0% | 72.7% | 57.5% | 0.4% | 26.7 | 0.56 | 1.76 | 65.9% | 128.8% |
| tartaruga | 3.59 | 0 | 0.0% | 71.7% | 26.9% | 0.1% | 29.6 | 0.15 | 2.64 | 43.4% | 72.9% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 142.1 | 0 | 2.17 | 29.3% | 23.6% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 0.11 | 0.00 | 0.19 | 0.10 | 0.00 | 0.00 | 0.01 | 0.01 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.04 | 0.27 | 0.00 | 0.03 | 0.00 | 0.07 | 0.00 |
| traidor | 0.11 | 0.02 | 0.10 | 0.22 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.07 | 0.23 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| tartaruga | 0.09 | 0.00 | 0.10 | 0.04 | 0.14 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 1045 | 38.2% | 1.91 | 26.1 | 2.51 | 23.9 | 25.5 | 17.6 | 41 | 5.3% | 47.5% | 1.9 |
| isolacionista | 961 | 23.3% | 1.17 | 23.8 | 2.23 | 24.3 | 22.6 | 15.2 | 33.6 | 5.8% | 46.7% | 2 |
| expansionista | 960 | 17.0% | 0.85 | 23.2 | 2.32 | 22.3 | 23.8 | 15.1 | 28.9 | 4.1% | 49.0% | 1.8 |
| diplomata | 1014 | 15.7% | 0.78 | 22.4 | 2.09 | 20.1 | 23 | 15.1 | 27.7 | 5.6% | 45.6% | 1.7 |
| militarista | 1020 | 5.4% | 0.27 | 18.7 | 2.11 | 19.9 | 18.8 | 11.4 | 25.3 | 4.5% | 53.2% | 1.1 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador + mercador | 159 | 60.4% | 3.02 | 33.2 | 1.97 | 19.2 | 22.5 | 25.8 | 15.6 | 0.6% | 14.5% | 2.3 |
| agressivo + mercador | 172 | 52.9% | 2.65 | 30.2 | 3.57 | 33.5 | 36.9 | 18.8 | 12 | 4.1% | 100.0% | 1 |
| traidor + mercador | 168 | 47.0% | 2.35 | 31.2 | 3.45 | 32.4 | 37.8 | 20.2 | 16.8 | 1.2% | 83.9% | 3.1 |
| mercador + isolacionista | 190 | 40.0% | 2.00 | 30.5 | 2.14 | 23.7 | 23.3 | 22.1 | 11.9 | 2.1% | 35.3% | 2 |
| oportunista + mercador | 181 | 39.8% | 1.99 | 28.6 | 3.03 | 28.2 | 36.4 | 19.1 | 10.7 | 0.6% | 88.4% | 1.7 |
| tartaruga + mercador | 181 | 33.7% | 1.69 | 30.1 | 1.79 | 17.7 | 17 | 23.2 | 11.5 | 2.2% | 0.0% | — |
| agressivo + isolacionista | 145 | 33.1% | 1.66 | 26.1 | 2.99 | 31.2 | 32 | 15.3 | 8.8 | 0.7% | 100.0% | 1 |
| mercador + expansionista | 159 | 29.6% | 1.48 | 28.7 | 2.07 | 19.9 | 23.5 | 21.2 | 9.2 | 0.6% | 25.2% | 1.8 |
| traidor + isolacionista | 142 | 26.8% | 1.34 | 28 | 2.7 | 29.2 | 28 | 18.1 | 12.3 | 1.4% | 65.5% | 3.4 |
| traidor + diplomata | 172 | 25.0% | 1.25 | 27.1 | 2.64 | 25.1 | 30.6 | 18.2 | 9.2 | 1.7% | 66.3% | 2.8 |
| oportunista + isolacionista | 161 | 22.4% | 1.12 | 25.7 | 2.68 | 27.7 | 30.7 | 16.3 | 8.4 | 1.2% | 89.4% | 2.1 |
| mercador + diplomata | 184 | 22.3% | 1.11 | 27.9 | 1.82 | 17.6 | 22.3 | 21.3 | 6.9 | 0.5% | 13.6% | 2 |
| traidor + expansionista | 158 | 21.5% | 1.08 | 27.3 | 2.8 | 26.9 | 28.8 | 17.8 | 10.9 | 1.3% | 65.8% | 3 |
| agressivo + diplomata | 187 | 20.9% | 1.04 | 24.3 | 2.69 | 26 | 31.3 | 15.1 | 6.9 | 2.1% | 100.0% | 1 |
| oportunista + expansionista | 158 | 20.9% | 1.04 | 24.6 | 2.75 | 25.4 | 31.6 | 15.8 | 6.8 | 0.0% | 93.7% | 1.8 |
| agressivo + expansionista | 179 | 19.6% | 0.98 | 24.3 | 2.93 | 28.1 | 32.2 | 14.5 | 8.1 | 1.1% | 99.4% | 1 |
| tartaruga + isolacionista | 157 | 16.6% | 0.83 | 26.8 | 1.75 | 20.5 | 18 | 19.3 | 10.1 | 3.2% | 0.0% | — |
| oportunista + diplomata | 154 | 13.0% | 0.65 | 22.9 | 2.38 | 21.6 | 28.9 | 15.4 | 5.9 | 0.6% | 88.3% | 1.5 |
| traidor + militarista | 161 | 11.8% | 0.59 | 22.7 | 2.57 | 23.6 | 23.5 | 14.6 | 4.1 | 1.9% | 93.2% | 1 |
| mercador + militarista | 165 | 10.3% | 0.52 | 24.4 | 2.04 | 19.5 | 20.3 | 17.1 | 3.8 | 1.2% | 30.3% | 1.8 |
| tartaruga + diplomata | 156 | 10.3% | 0.51 | 26.5 | 1.74 | 17.1 | 18.4 | 19.8 | 7.8 | 0.6% | 0.0% | — |
| tartaruga + expansionista | 164 | 8.5% | 0.43 | 26.8 | 1.85 | 18.2 | 18.3 | 19.7 | 8.9 | 1.2% | 0.0% | — |
| agressivo + militarista | 162 | 6.8% | 0.34 | 20.4 | 2.73 | 25.8 | 24.4 | 11.2 | 3.6 | 1.2% | 100.0% | 1 |
| oportunista + militarista | 186 | 2.7% | 0.13 | 19.5 | 2.28 | 20.1 | 20.9 | 12.6 | 3.3 | 2.2% | 97.3% | 1 |
| tartaruga + militarista | 149 | 2.0% | 0.10 | 22.5 | 1.79 | 17.4 | 19.1 | 15.7 | 3.2 | 0.7% | 0.0% | — |
| passivo + diplomata | 161 | 0.0% | 0.00 | 4.8 | 1.2 | 12 | 4.8 | 0.1 | 135.7 | 29.2% | 0.0% | — |
| passivo + expansionista | 142 | 0.0% | 0.00 | 5.3 | 1.35 | 13.5 | 5.4 | 0 | 145 | 22.5% | 0.0% | — |
| passivo + isolacionista | 166 | 0.0% | 0.00 | 5.7 | 1.27 | 15.3 | 5.1 | 0 | 145 | 25.3% | 0.0% | — |
| passivo + mercador | 184 | 0.0% | 0.00 | 5.1 | 1.3 | 13 | 3.9 | 0.1 | 171.1 | 21.7% | 0.0% | — |
| passivo + militarista | 197 | 0.0% | 0.00 | 5.4 | 1.38 | 13.8 | 6.9 | 0 | 115.8 | 17.3% | 0.0% | — |

## Traço fixo: qual estratégia vence

| experimento | estratégia | assentos | vitória | índice | pontos | regiões |
| --- | --- | --- | --- | --- | --- | --- |
| trait-expansionista-3 | agressivo | 97 | 54.6% | 1.64 | 26.2 | 3.16 |
| trait-expansionista-3 | traidor | 104 | 51.9% | 1.56 | 28.9 | 2.94 |
| trait-expansionista-3 | mercador | 103 | 41.7% | 1.25 | 30.6 | 2.01 |
| trait-expansionista-3 | oportunista | 93 | 40.9% | 1.23 | 29.1 | 2.92 |
| trait-expansionista-3 | tartaruga | 94 | 12.8% | 0.38 | 27.6 | 1.73 |
| trait-expansionista-3 | passivo | 109 | 0.0% | 0.00 | 6.2 | 1.57 |
| trait-expansionista-4 | mercador | 134 | 49.3% | 1.97 | 31.1 | 2.1 |
| trait-expansionista-4 | traidor | 146 | 44.5% | 1.78 | 30.5 | 3.16 |
| trait-expansionista-4 | agressivo | 135 | 20.7% | 0.83 | 23.7 | 2.9 |
| trait-expansionista-4 | oportunista | 137 | 18.2% | 0.73 | 27.8 | 2.92 |
| trait-expansionista-4 | tartaruga | 130 | 12.3% | 0.49 | 26.8 | 1.79 |
| trait-expansionista-4 | passivo | 118 | 0.0% | 0.00 | 5.3 | 1.31 |
| trait-expansionista-5 | mercador | 172 | 36.6% | 1.83 | 27 | 2.02 |
| trait-expansionista-5 | traidor | 156 | 27.6% | 1.38 | 26.6 | 2.79 |
| trait-expansionista-5 | oportunista | 170 | 24.7% | 1.24 | 24.6 | 2.71 |
| trait-expansionista-5 | agressivo | 175 | 16.6% | 0.83 | 24.3 | 2.82 |
| trait-expansionista-5 | tartaruga | 157 | 14.6% | 0.73 | 26.1 | 1.8 |
| trait-expansionista-5 | passivo | 170 | 0.0% | 0.00 | 5.1 | 1.33 |
| trait-mercador-3 | agressivo | 92 | 58.7% | 1.76 | 31.1 | 3.64 |
| trait-mercador-3 | mercador | 99 | 51.5% | 1.55 | 33.7 | 1.74 |
| trait-mercador-3 | oportunista | 110 | 46.4% | 1.39 | 31 | 2.98 |
| trait-mercador-3 | traidor | 98 | 32.7% | 0.98 | 30.9 | 2.96 |
| trait-mercador-3 | tartaruga | 102 | 11.8% | 0.35 | 30 | 1.65 |
| trait-mercador-3 | passivo | 99 | 0.0% | 0.00 | 4.5 | 1.16 |
| trait-mercador-4 | mercador | 133 | 44.4% | 1.77 | 32.7 | 1.7 |
| trait-mercador-4 | agressivo | 123 | 38.2% | 1.53 | 32.6 | 4.15 |
| trait-mercador-4 | traidor | 140 | 29.3% | 1.17 | 29.9 | 3.02 |
| trait-mercador-4 | oportunista | 136 | 24.3% | 0.97 | 31.2 | 2.92 |
| trait-mercador-4 | tartaruga | 144 | 13.9% | 0.56 | 29.5 | 1.67 |
| trait-mercador-4 | passivo | 124 | 0.0% | 0.00 | 4.1 | 0.99 |
| trait-mercador-5 | traidor | 166 | 34.9% | 1.75 | 31.1 | 3.46 |
| trait-mercador-5 | mercador | 164 | 29.3% | 1.46 | 30 | 1.81 |
| trait-mercador-5 | agressivo | 169 | 24.9% | 1.24 | 28.7 | 3.09 |
| trait-mercador-5 | oportunista | 162 | 17.3% | 0.86 | 27.6 | 2.78 |
| trait-mercador-5 | tartaruga | 169 | 14.2% | 0.71 | 29.1 | 1.72 |
| trait-mercador-5 | passivo | 170 | 0.0% | 0.00 | 2.9 | 0.71 |
| trait-diplomata-3 | agressivo | 101 | 66.3% | 1.99 | 28.4 | 3.58 |
| trait-diplomata-3 | mercador | 95 | 46.3% | 1.39 | 30.9 | 1.93 |
| trait-diplomata-3 | traidor | 96 | 44.8% | 1.34 | 29.7 | 2.86 |
| trait-diplomata-3 | oportunista | 94 | 34.0% | 1.02 | 28.6 | 2.86 |
| trait-diplomata-3 | tartaruga | 103 | 13.6% | 0.41 | 28 | 1.8 |
| trait-diplomata-3 | passivo | 111 | 0.0% | 0.00 | 4.1 | 1.05 |
| trait-diplomata-4 | mercador | 130 | 46.2% | 1.85 | 30.7 | 1.85 |
| trait-diplomata-4 | traidor | 139 | 38.1% | 1.53 | 31.2 | 3.06 |
| trait-diplomata-4 | agressivo | 126 | 33.3% | 1.33 | 29.2 | 3.85 |
| trait-diplomata-4 | oportunista | 123 | 22.8% | 0.91 | 28.3 | 2.67 |
| trait-diplomata-4 | tartaruga | 144 | 11.8% | 0.47 | 28 | 1.82 |
| trait-diplomata-4 | passivo | 138 | 0.0% | 0.00 | 4.1 | 1.06 |
| trait-diplomata-5 | traidor | 166 | 36.1% | 1.81 | 28.5 | 2.86 |
| trait-diplomata-5 | mercador | 168 | 32.7% | 1.64 | 28.9 | 1.99 |
| trait-diplomata-5 | agressivo | 168 | 19.0% | 0.95 | 26.6 | 3.04 |
| trait-diplomata-5 | oportunista | 172 | 16.9% | 0.84 | 23.9 | 2.38 |
| trait-diplomata-5 | tartaruga | 160 | 15.0% | 0.75 | 26.6 | 1.75 |
| trait-diplomata-5 | passivo | 166 | 0.0% | 0.00 | 5 | 1.28 |
| trait-militarista-3 | traidor | 99 | 54.5% | 1.64 | 24.8 | 3.15 |
| trait-militarista-3 | mercador | 102 | 46.1% | 1.38 | 25 | 2.17 |
| trait-militarista-3 | oportunista | 106 | 42.5% | 1.27 | 24.3 | 3.12 |
| trait-militarista-3 | agressivo | 98 | 37.8% | 1.13 | 21.3 | 2.97 |
| trait-militarista-3 | tartaruga | 83 | 20.5% | 0.61 | 23 | 1.92 |
| trait-militarista-3 | passivo | 112 | 0.0% | 0.00 | 7.5 | 1.86 |
| trait-militarista-4 | mercador | 131 | 51.1% | 2.05 | 27.2 | 2.51 |
| trait-militarista-4 | traidor | 131 | 39.7% | 1.59 | 25.1 | 2.83 |
| trait-militarista-4 | agressivo | 132 | 22.7% | 0.91 | 21.6 | 3.27 |
| trait-militarista-4 | oportunista | 142 | 22.5% | 0.90 | 22.6 | 2.79 |
| trait-militarista-4 | tartaruga | 137 | 13.9% | 0.55 | 23.2 | 1.91 |
| trait-militarista-4 | passivo | 127 | 0.0% | 0.00 | 7.7 | 1.9 |
| trait-militarista-5 | traidor | 166 | 28.3% | 1.42 | 22 | 2.54 |
| trait-militarista-5 | mercador | 166 | 25.3% | 1.27 | 22.6 | 2.09 |
| trait-militarista-5 | oportunista | 157 | 24.8% | 1.24 | 20.8 | 2.62 |
| trait-militarista-5 | tartaruga | 174 | 24.7% | 1.24 | 22.9 | 1.87 |
| trait-militarista-5 | agressivo | 170 | 17.1% | 0.85 | 21.4 | 3.16 |
| trait-militarista-5 | passivo | 167 | 0.0% | 0.00 | 6.9 | 1.77 |
| trait-isolacionista-3 | agressivo | 106 | 58.5% | 1.75 | 27 | 2.96 |
| trait-isolacionista-3 | mercador | 104 | 50.0% | 1.50 | 33 | 2.39 |
| trait-isolacionista-3 | traidor | 96 | 39.6% | 1.19 | 30.1 | 3 |
| trait-isolacionista-3 | oportunista | 102 | 33.3% | 1.00 | 29.5 | 3.02 |
| trait-isolacionista-3 | tartaruga | 103 | 13.6% | 0.41 | 28 | 1.79 |
| trait-isolacionista-3 | passivo | 89 | 0.0% | 0.00 | 6.7 | 1.47 |
| trait-isolacionista-4 | mercador | 123 | 55.3% | 2.21 | 33.6 | 2.35 |
| trait-isolacionista-4 | traidor | 138 | 33.3% | 1.33 | 31.4 | 3.12 |
| trait-isolacionista-4 | oportunista | 124 | 31.5% | 1.26 | 31.1 | 3.2 |
| trait-isolacionista-4 | agressivo | 144 | 26.4% | 1.06 | 26.2 | 3.23 |
| trait-isolacionista-4 | tartaruga | 130 | 6.9% | 0.28 | 27.7 | 1.76 |
| trait-isolacionista-4 | passivo | 141 | 0.0% | 0.00 | 5.8 | 1.24 |
| trait-isolacionista-5 | mercador | 157 | 38.2% | 1.91 | 29.7 | 2.17 |
| trait-isolacionista-5 | oportunista | 173 | 24.9% | 1.24 | 26.2 | 2.84 |
| trait-isolacionista-5 | traidor | 169 | 24.3% | 1.21 | 27.4 | 2.75 |
| trait-isolacionista-5 | tartaruga | 175 | 18.9% | 0.94 | 27.2 | 1.77 |
| trait-isolacionista-5 | agressivo | 162 | 14.2% | 0.71 | 25.4 | 2.88 |
| trait-isolacionista-5 | passivo | 164 | 0.0% | 0.00 | 5.5 | 1.21 |

## Estratégia fixa: qual traço vence

| experimento | traço | assentos | vitória | índice | pontos | regiões |
| --- | --- | --- | --- | --- | --- | --- |
| strategy-agressivo-3 | mercador | 128 | 64.1% | 1.92 | 27.9 | 3.02 |
| strategy-agressivo-3 | isolacionista | 130 | 33.8% | 1.02 | 21.4 | 2.24 |
| strategy-agressivo-3 | diplomata | 110 | 31.8% | 0.95 | 22.7 | 2.42 |
| strategy-agressivo-3 | expansionista | 110 | 28.2% | 0.85 | 21.2 | 2.36 |
| strategy-agressivo-3 | militarista | 122 | 6.6% | 0.20 | 19.5 | 2.68 |
| strategy-agressivo-4 | mercador | 142 | 45.1% | 1.80 | 26.5 | 2.89 |
| strategy-agressivo-4 | diplomata | 171 | 31.6% | 1.26 | 21.7 | 2.64 |
| strategy-agressivo-4 | militarista | 156 | 24.4% | 0.97 | 18.5 | 2.37 |
| strategy-agressivo-4 | expansionista | 158 | 17.1% | 0.68 | 20.3 | 2.39 |
| strategy-agressivo-4 | isolacionista | 173 | 9.8% | 0.39 | 19.7 | 2.16 |
| strategy-agressivo-5 | mercador | 200 | 40.0% | 2.00 | 21.3 | 1.99 |
| strategy-agressivo-5 | isolacionista | 200 | 23.0% | 1.15 | 19.2 | 2.11 |
| strategy-agressivo-5 | expansionista | 200 | 21.5% | 1.07 | 20.2 | 2.22 |
| strategy-agressivo-5 | diplomata | 200 | 12.5% | 0.62 | 18.9 | 1.98 |
| strategy-agressivo-5 | militarista | 200 | 3.0% | 0.15 | 15.3 | 1.92 |
| strategy-mercador-3 | mercador | 116 | 69.8% | 2.09 | 38 | 2 |
| strategy-mercador-3 | militarista | 120 | 47.5% | 1.42 | 34.7 | 2.67 |
| strategy-mercador-3 | isolacionista | 116 | 43.1% | 1.29 | 38 | 2.43 |
| strategy-mercador-3 | diplomata | 131 | 9.2% | 0.27 | 36 | 2 |
| strategy-mercador-3 | expansionista | 117 | 0.0% | 0.00 | 34.3 | 2 |
| strategy-mercador-4 | isolacionista | 153 | 73.2% | 2.93 | 39.4 | 2.73 |
| strategy-mercador-4 | militarista | 159 | 31.4% | 1.26 | 35.7 | 2.77 |
| strategy-mercador-4 | mercador | 166 | 12.7% | 0.51 | 37.8 | 2 |
| strategy-mercador-4 | expansionista | 162 | 10.5% | 0.42 | 35.4 | 2.22 |
| strategy-mercador-4 | diplomata | 160 | 0.0% | 0.00 | 35.7 | 2 |
| strategy-mercador-5 | isolacionista | 200 | 41.5% | 2.07 | 37.2 | 2.37 |
| strategy-mercador-5 | mercador | 200 | 35.5% | 1.77 | 37.6 | 2 |
| strategy-mercador-5 | diplomata | 200 | 9.5% | 0.47 | 35.7 | 2 |
| strategy-mercador-5 | militarista | 200 | 8.0% | 0.40 | 30.1 | 2.29 |
| strategy-mercador-5 | expansionista | 200 | 5.5% | 0.27 | 34 | 2.15 |
| strategy-tartaruga-3 | mercador | 125 | 100.0% | 3.00 | 34.6 | 2 |
| strategy-tartaruga-3 | isolacionista | 116 | 38.8% | 1.16 | 31 | 2 |
| strategy-tartaruga-3 | diplomata | 122 | 18.9% | 0.57 | 30.1 | 2 |
| strategy-tartaruga-3 | expansionista | 115 | 6.1% | 0.18 | 29.1 | 2 |
| strategy-tartaruga-3 | militarista | 122 | 0.0% | 0.00 | 27.3 | 2 |
| strategy-tartaruga-4 | mercador | 168 | 100.0% | 4.00 | 33.9 | 2 |
| strategy-tartaruga-4 | isolacionista | 155 | 14.8% | 0.59 | 30.5 | 2 |
| strategy-tartaruga-4 | diplomata | 161 | 5.0% | 0.20 | 29.6 | 2 |
| strategy-tartaruga-4 | expansionista | 158 | 0.6% | 0.03 | 28.7 | 2 |
| strategy-tartaruga-4 | militarista | 158 | 0.0% | 0.00 | 26.2 | 2 |
| strategy-tartaruga-5 | mercador | 200 | 96.0% | 4.80 | 33.9 | 2 |
| strategy-tartaruga-5 | isolacionista | 200 | 4.0% | 0.20 | 30.6 | 2 |
| strategy-tartaruga-5 | diplomata | 200 | 0.0% | 0.00 | 29.6 | 2 |
| strategy-tartaruga-5 | expansionista | 200 | 0.0% | 0.00 | 28.9 | 2 |
| strategy-tartaruga-5 | militarista | 200 | 0.0% | 0.00 | 26.4 | 2 |
| strategy-oportunista-3 | mercador | 118 | 58.5% | 1.75 | 28.1 | 2.94 |
| strategy-oportunista-3 | isolacionista | 122 | 57.4% | 1.72 | 25.4 | 2.7 |
| strategy-oportunista-3 | expansionista | 120 | 30.0% | 0.90 | 24.4 | 2.58 |
| strategy-oportunista-3 | diplomata | 123 | 20.3% | 0.61 | 25.5 | 2.81 |
| strategy-oportunista-3 | militarista | 117 | 0.0% | 0.00 | 19.7 | 2.28 |
| strategy-oportunista-4 | mercador | 149 | 64.4% | 2.58 | 29.8 | 3.16 |
| strategy-oportunista-4 | isolacionista | 160 | 27.5% | 1.10 | 26.4 | 2.78 |
| strategy-oportunista-4 | expansionista | 163 | 23.3% | 0.93 | 24.7 | 2.59 |
| strategy-oportunista-4 | diplomata | 156 | 14.1% | 0.56 | 23.3 | 2.22 |
| strategy-oportunista-4 | militarista | 172 | 0.0% | 0.00 | 19.9 | 2.45 |
| strategy-oportunista-5 | mercador | 200 | 47.0% | 2.35 | 24.2 | 2.34 |
| strategy-oportunista-5 | isolacionista | 200 | 25.5% | 1.27 | 23.6 | 2.58 |
| strategy-oportunista-5 | expansionista | 200 | 18.0% | 0.90 | 22.4 | 2.57 |
| strategy-oportunista-5 | diplomata | 200 | 9.5% | 0.47 | 21.6 | 2.16 |
| strategy-oportunista-5 | militarista | 200 | 0.0% | 0.00 | 18.9 | 2.35 |
| strategy-traidor-3 | militarista | 116 | 46.6% | 1.40 | 32.9 | 3 |
| strategy-traidor-3 | mercador | 127 | 35.4% | 1.06 | 29.1 | 2.65 |
| strategy-traidor-3 | isolacionista | 119 | 33.6% | 1.01 | 32.5 | 2.32 |
| strategy-traidor-3 | expansionista | 123 | 26.0% | 0.78 | 31.1 | 2.32 |
| strategy-traidor-3 | diplomata | 115 | 25.2% | 0.76 | 31.7 | 2.26 |
| strategy-traidor-4 | mercador | 153 | 36.6% | 1.46 | 29.5 | 2.85 |
| strategy-traidor-4 | diplomata | 160 | 33.1% | 1.33 | 31.9 | 2.72 |
| strategy-traidor-4 | militarista | 162 | 19.8% | 0.79 | 29.7 | 2.7 |
| strategy-traidor-4 | expansionista | 158 | 19.0% | 0.76 | 29.1 | 2.66 |
| strategy-traidor-4 | isolacionista | 167 | 17.4% | 0.69 | 30.9 | 2.59 |
| strategy-traidor-5 | diplomata | 200 | 30.5% | 1.52 | 26.8 | 2.34 |
| strategy-traidor-5 | mercador | 200 | 24.0% | 1.20 | 26.8 | 2.83 |
| strategy-traidor-5 | isolacionista | 200 | 21.5% | 1.07 | 27 | 2.35 |
| strategy-traidor-5 | expansionista | 200 | 15.5% | 0.77 | 25.9 | 2.4 |
| strategy-traidor-5 | militarista | 200 | 8.5% | 0.42 | 21.2 | 1.88 |
| strategy-passivo-3 | isolacionista | 115 | 100.0% | 3.00 | 9 | 2 |
| strategy-passivo-3 | militarista | 125 | 56.8% | 1.70 | 8 | 2 |
| strategy-passivo-3 | expansionista | 125 | 7.2% | 0.22 | 8 | 2 |
| strategy-passivo-3 | diplomata | 123 | 4.1% | 0.12 | 8 | 2 |
| strategy-passivo-3 | mercador | 112 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-4 | isolacionista | 155 | 100.0% | 4.00 | 9 | 2 |
| strategy-passivo-4 | militarista | 158 | 28.5% | 1.14 | 8 | 2 |
| strategy-passivo-4 | diplomata | 158 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-4 | expansionista | 168 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-4 | mercador | 161 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-5 | isolacionista | 200 | 100.0% | 5.00 | 9 | 2 |
| strategy-passivo-5 | diplomata | 200 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-5 | expansionista | 200 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-5 | mercador | 200 | 0.0% | 0.00 | 8 | 2 |
| strategy-passivo-5 | militarista | 200 | 0.0% | 0.00 | 8 | 2 |

## Guerra: domínio do ataque em massa (4 jogadores)

| experimento | cenário | vitória do agressivo | índice | regiões do agressivo | conquistas | ataques perdidos | eliminações/partida | acabou antes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| war-turtles-walls-nochain | 1 agressivo x 3 tartarugas; com muralha; 1 ataque por exército | 34.5% | 1.38 | 3.64 | 1.64 | 0 | 0 | 0.0% |
| war-turtles-nowalls-nochain | 1 agressivo x 3 tartarugas; sem muralha; 1 ataque por exército | 7.5% | 0.30 | 3.37 | 1.37 | 0 | 0.01 | 0.0% |
| war-field-walls-nochain | 1 agressivo x 3 sorteados (sem agressivo); com muralha; 1 ataque por exército | 20.5% | 0.82 | 3 | 1.46 | 0 | 0.01 | 0.0% |
| war-field-nowalls-nochain | 1 agressivo x 3 sorteados (sem agressivo); sem muralha; 1 ataque por exército | 15.0% | 0.60 | 3.14 | 1.5 | 0 | 0.02 | 0.0% |
| war-passive-walls-nochain | 1 agressivo x 3 passivos; com muralha; 1 ataque por exército | 100.0% | 4.00 | 6.9 | 4.89 | 0 | 1.23 | 20.0% |
| war-passive-nowalls-nochain | 1 agressivo x 3 passivos; sem muralha; 1 ataque por exército | 100.0% | 4.00 | 6.81 | 4.81 | 0 | 1.21 | 22.0% |

## Manutenção linear x superlinear (só medição)

### Mistura livre, 4 jogadores, manutenção linear (regra atual)

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 681 | 43.3% | 1.73 | 31.8 | 2.14 | 21 | 19 | 24 | 14.3 | 1.3% | 36.6% | 2.4 |
| traidor | 663 | 33.6% | 1.35 | 30.2 | 3.08 | 29.4 | 28.5 | 20.1 | 12.4 | 0.6% | 87.8% | 2 |
| agressivo | 674 | 33.2% | 1.33 | 26.7 | 3.47 | 31.5 | 29.7 | 16 | 10.1 | 0.3% | 99.9% | 1 |
| oportunista | 682 | 27.0% | 1.08 | 27.1 | 2.8 | 26.3 | 28.4 | 17.9 | 8.8 | 1.2% | 93.8% | 1.5 |
| tartaruga | 664 | 11.1% | 0.45 | 27.4 | 1.81 | 18.6 | 17.2 | 20.1 | 8.6 | 0.6% | 0.0% | — |
| passivo | 636 | 0.0% | 0.00 | 5.4 | 1.3 | 13.5 | 5.2 | 0 | 143.6 | 26.4% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 3.98 | 0 | 0.0% | 63.9% | 19.2% | 0.9% | 42.5 | 0.17 | 2.78 | 40.0% | 64.4% |
| traidor | 3.91 | 0.55 | 0.0% | 61.3% | 21.8% | 2.9% | 41.4 | 0.19 | 2.83 | 44.1% | 79.1% |
| agressivo | 0 | 0 | 0.0% | 68.1% | 57.3% | 0.0% | 18.9 | 0.42 | 2.09 | 64.1% | 120.2% |
| oportunista | 1.66 | 0 | 0.0% | 73.1% | 43.6% | 0.8% | 30.9 | 0.29 | 2.13 | 58.1% | 106.2% |
| tartaruga | 3.36 | 0 | 0.0% | 73.4% | 25.4% | 0.1% | 29.2 | 0.18 | 2.66 | 44.0% | 69.6% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 143.6 | 0 | 2.15 | 28.5% | 23.8% |

### Mistura livre, 4 jogadores, manutenção superlinear cobrada pelo árbitro (só medição)

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 704 | 44.9% | 1.80 | 28.8 | 2.25 | 21.8 | 19.1 | 20.6 | 6.4 | 0.1% | 40.2% | 2.4 |
| traidor | 618 | 35.3% | 1.41 | 26.3 | 2.96 | 28.1 | 25 | 16.6 | 3.8 | 0.5% | 84.5% | 2 |
| agressivo | 628 | 24.5% | 0.98 | 21.9 | 3.11 | 28.7 | 25.3 | 11.9 | 2.7 | 0.3% | 99.8% | 1 |
| oportunista | 675 | 24.1% | 0.97 | 23.6 | 2.83 | 26.3 | 24.8 | 14.4 | 2.1 | 0.3% | 91.1% | 1.2 |
| tartaruga | 671 | 21.8% | 0.87 | 24.8 | 1.87 | 18.9 | 17.2 | 17.5 | 2.9 | 0.0% | 0.0% | — |
| passivo | 704 | 0.4% | 0.02 | 6.3 | 1.52 | 15.8 | 6.2 | 0 | 150.8 | 17.6% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 3.39 | 0 | 0.0% | 72.9% | 33.2% | 0.6% | 39.9 | 0.2 | 2.41 | 40.4% | 63.3% |
| traidor | 3.23 | 0.31 | 0.0% | 73.8% | 41.0% | 1.2% | 39 | 0.28 | 2.27 | 43.1% | 72.2% |
| agressivo | 0 | 0 | 0.0% | 80.4% | 81.0% | 0.0% | 15.4 | 0.29 | 1.5 | 60.4% | 104.5% |
| oportunista | 1.26 | 0 | 0.0% | 82.7% | 63.8% | 0.3% | 28.2 | 0.3 | 1.62 | 55.2% | 92.6% |
| tartaruga | 2.83 | 0 | 0.0% | 81.9% | 39.7% | 0.0% | 26.6 | 0.21 | 2.41 | 44.3% | 69.2% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 150.8 | 0 | 2.49 | 29.2% | 23.6% |

## Campanha 60 turnos, 4 bots sorteados (motor como está)

| fim da sessão (turno) | vivos | pontos | dinheiro | maior caixa | renda/turno | manutenção/turno | influência | pop | exército | regiões |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | 99.9% | 14.4 | 27.2 | 86 | 11 | 4.1 | 7.6 | 16.7 | 12.7 | 2.4 |
| 12 | 98.1% | 18.8 | 28.7 | 134 | 12.8 | 5.8 | 10.7 | 22.1 | 17.9 | 2.6 |
| 18 | 96.0% | 22.9 | 33.1 | 194 | 14.5 | 7.9 | 13.7 | 26.4 | 23.3 | 2.8 |
| 24 | 94.4% | 26.4 | 36.1 | 254 | 15.4 | 9.8 | 16.5 | 29.6 | 29.2 | 2.9 |
| 30 | 92.4% | 29.6 | 38.8 | 314 | 17.1 | 11.8 | 18.9 | 32.3 | 34.9 | 2.9 |
| 36 | 93.3% | 31.4 | 40.1 | 374 | 17.3 | 13.6 | 20.5 | 33.2 | 40 | 2.9 |
| 42 | 92.7% | 32.6 | 42.4 | 458 | 17.7 | 14.9 | 21.4 | 34.3 | 44.1 | 3 |
| 48 | 92.5% | 33.5 | 47.5 | 542 | 17.7 | 16 | 22.1 | 35.1 | 47.5 | 3 |
| 54 | 92.3% | 34.1 | 52.9 | 626 | 18.1 | 16.8 | 22.6 | 35.8 | 50.1 | 3 |
| 60 | 92.8% | 35 | 58.5 | 710 | 17.9 | 17.3 | 23.4 | 35.9 | 51.5 | 3 |

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 137 | 40.9% | 1.64 | 38.1 | 4.14 | 47.9 | 63.9 | 23.6 | 9.1 | 10.9% | 86.9% | 2.9 |
| oportunista | 135 | 34.1% | 1.36 | 38.7 | 3.6 | 43.1 | 62.6 | 25.4 | 6.4 | 9.6% | 96.3% | 1.6 |
| agressivo | 135 | 32.6% | 1.30 | 38.1 | 4.04 | 44.7 | 56.6 | 24.1 | 7.6 | 8.1% | 100.0% | 1 |
| mercador | 122 | 29.5% | 1.18 | 36.9 | 2.52 | 30.1 | 50.3 | 27.1 | 5 | 10.7% | 73.8% | 4.7 |
| tartaruga | 135 | 13.3% | 0.53 | 35.2 | 1.51 | 21.1 | 28.8 | 27.7 | 31 | 14.1% | 0.0% | — |
| passivo | 136 | 0.0% | 0.00 | 3.6 | 0.82 | 9.8 | 3.4 | 0 | 308.2 | 52.2% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 8.89 | 4.17 | 0.0% | 70.5% | 46.6% | 2.4% | 41.5 | 3.91 | 34.94 | 70.5% | 178.2% |
| oportunista | 1.94 | 0 | 0.0% | 79.4% | 64.7% | 1.5% | 32.2 | 4.36 | 28.82 | 83.0% | 222.1% |
| agressivo | 0 | 0 | 0.0% | 78.0% | 73.1% | 0.1% | 21 | 4.6 | 28.19 | 86.8% | 227.8% |
| mercador | 7.56 | 0 | 0.0% | 77.9% | 49.4% | 1.6% | 41.4 | 4.22 | 25.56 | 74.4% | 197.1% |
| tartaruga | 6.3 | 0 | 0.0% | 86.6% | 40.9% | 5.0% | 52.2 | 2.98 | 15.61 | 66.4% | 164.4% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 308.2 | 0 | 13.96 | 25.7% | 20.2% |

## Campanha 60 turnos, só mercador e tartaruga (economia pura)

| fim da sessão (turno) | vivos | pontos | dinheiro | maior caixa | renda/turno | manutenção/turno | influência | pop | exército | regiões |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | 100.0% | 16.9 | 28.8 | 49 | 13.1 | 3.2 | 10.1 | 16.5 | 10.2 | 2.2 |
| 12 | 100.0% | 23 | 31.1 | 55 | 15.3 | 4.1 | 15.1 | 21.4 | 13 | 2.4 |
| 18 | 100.0% | 30 | 29.5 | 55 | 16.5 | 5.5 | 21.2 | 24.6 | 16.4 | 2.5 |
| 24 | 100.0% | 35.6 | 33.1 | 56 | 14.8 | 7.8 | 26.2 | 27.1 | 23.3 | 2.6 |
| 30 | 100.0% | 38.5 | 28.1 | 60 | 19.5 | 10.9 | 28.4 | 29.5 | 31.7 | 2.7 |
| 36 | 100.0% | 39.4 | 21.7 | 64 | 19.6 | 13.5 | 29.1 | 31.1 | 39.1 | 2.7 |
| 42 | 100.0% | 39.9 | 18.4 | 96 | 19.5 | 15.4 | 29.1 | 32.6 | 45 | 2.7 |
| 48 | 100.0% | 40.5 | 26.3 | 158 | 18.3 | 16.7 | 29.3 | 33.9 | 48.7 | 2.7 |
| 54 | 100.0% | 40.8 | 27.6 | 197 | 19.9 | 17.6 | 29.4 | 34.9 | 51.7 | 2.7 |
| 60 | 100.0% | 41 | 29.7 | 246 | 19.3 | 18.4 | 29.5 | 35.5 | 53.9 | 2.7 |

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 410 | 37.8% | 1.51 | 42.7 | 3.44 | 41.1 | 70.3 | 29.8 | 6.9 | 0.0% | 79.8% | 6.4 |
| tartaruga | 390 | 11.5% | 0.46 | 39.3 | 2 | 29.5 | 36.7 | 29.3 | 53.6 | 0.0% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 11.05 | 0 | 0.0% | 65.5% | 28.0% | 4.9% | 52 | 3.98 | 33.1 | 64.5% | 175.2% |
| tartaruga | 10.43 | 0 | 0.0% | 81.1% | 28.0% | 9.6% | 76.3 | 3.31 | 17.26 | 57.7% | 138.3% |

