# Simulador de bots — tabelas

- Motor: commit a855d7b (src/engine e src/data lidos de outro checkout, sem cópia)
- Partidas: 20600
- Experimentos: 59
- Hash dos resultados: 6d289f71a408095e
- Bots: usam só applyAction, chooseDilemma e endTurn; sementes fixas; sem relógio nem Math.random

`índice` = taxa de vitória ÷ fatia justa (1 ÷ jogadores). 1.00 é equilibrado.

## 1. Resumo por experimento

| experimento | partidas | rodadas | acabou antes | líder no T10 vence | eliminações/partida | partidas com eliminação | impasse (0 ações) | rodadas sem ação | ações por vez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mix-3 | 1000 | 20 | 0.0% | 69.1% (n=1000) | 0 | 0.4% | 0.2% | 75.6% | 0.19 |
| mix-4 | 1000 | 20 | 0.0% | 58.5% (n=1000) | 0.05 | 4.6% | 0.0% | 64.6% | 0.2 |
| mix-5 | 1000 | 20 | 0.0% | 61.2% (n=1000) | 0.08 | 7.4% | 0.0% | 55.4% | 0.2 |
| trait-expansionista-3 | 200 | 20 | 0.0% | 74.5% (n=200) | 0 | 0.0% | 0.0% | 74.5% | 0.19 |
| trait-expansionista-4 | 200 | 20 | 0.0% | 71.0% (n=200) | 0.04 | 3.5% | 0.0% | 63.1% | 0.22 |
| trait-expansionista-5 | 200 | 20 | 0.0% | 67.5% (n=200) | 0.06 | 6.0% | 0.0% | 52.8% | 0.21 |
| trait-mercador-3 | 200 | 20 | 0.0% | 55.5% (n=200) | 0.02 | 2.0% | 0.0% | 66.0% | 0.25 |
| trait-mercador-4 | 200 | 20 | 0.0% | 55.0% (n=200) | 0.1 | 9.5% | 0.0% | 53.7% | 0.27 |
| trait-mercador-5 | 200 | 20 | 0.0% | 58.0% (n=200) | 0.24 | 23.5% | 0.0% | 44.3% | 0.27 |
| trait-diplomata-3 | 200 | 20 | 0.0% | 63.0% (n=200) | 0 | 0.0% | 0.0% | 79.5% | 0.16 |
| trait-diplomata-4 | 200 | 20 | 0.0% | 72.5% (n=200) | 0.03 | 3.0% | 0.0% | 68.9% | 0.18 |
| trait-diplomata-5 | 200 | 20 | 0.0% | 70.0% (n=200) | 0.06 | 6.0% | 0.0% | 57.0% | 0.19 |
| trait-militarista-3 | 200 | 20 | 0.0% | 81.5% (n=200) | 0 | 0.0% | 0.0% | 83.9% | 0.12 |
| trait-militarista-4 | 200 | 20 | 0.0% | 66.5% (n=200) | 0 | 0.0% | 0.0% | 77.5% | 0.14 |
| trait-militarista-5 | 200 | 20 | 0.0% | 85.5% (n=200) | 0 | 0.0% | 0.0% | 70.7% | 0.15 |
| trait-isolacionista-3 | 200 | 20 | 0.0% | 69.0% (n=200) | 0 | 0.0% | 0.0% | 73.3% | 0.2 |
| trait-isolacionista-4 | 200 | 20 | 0.0% | 67.5% (n=200) | 0.06 | 5.5% | 0.0% | 64.6% | 0.21 |
| trait-isolacionista-5 | 200 | 20 | 0.0% | 57.5% (n=200) | 0.05 | 5.0% | 0.0% | 52.6% | 0.21 |
| strategy-agressivo-3 | 200 | 20 | 0.0% | 75.5% (n=200) | 0 | 0.0% | 0.0% | 77.4% | 0.24 |
| strategy-agressivo-4 | 200 | 20 | 0.0% | 78.5% (n=200) | 0 | 0.0% | 0.0% | 68.6% | 0.23 |
| strategy-agressivo-5 | 200 | 20 | 0.0% | 82.0% (n=200) | 0 | 0.0% | 0.0% | 52.3% | 0.26 |
| strategy-mercador-3 | 200 | 20 | 0.0% | 14.0% (n=200) | 0 | 0.0% | 0.0% | 59.2% | 0.27 |
| strategy-mercador-4 | 200 | 20 | 0.0% | 9.5% (n=200) | 0 | 0.0% | 0.0% | 54.5% | 0.26 |
| strategy-mercador-5 | 200 | 20 | 0.0% | 20.0% (n=200) | 0 | 0.0% | 0.0% | 46.9% | 0.23 |
| strategy-tartaruga-3 | 200 | 20 | 0.0% | 60.5% (n=200) | 0 | 0.0% | 0.0% | 78.6% | 0.15 |
| strategy-tartaruga-4 | 200 | 20 | 0.0% | 59.0% (n=200) | 0 | 0.0% | 0.0% | 74.2% | 0.16 |
| strategy-tartaruga-5 | 200 | 20 | 0.0% | 32.5% (n=200) | 0 | 0.0% | 0.0% | 75.7% | 0.15 |
| strategy-oportunista-3 | 200 | 20 | 0.0% | 80.5% (n=200) | 0 | 0.0% | 0.0% | 85.8% | 0.19 |
| strategy-oportunista-4 | 200 | 20 | 0.0% | 88.5% (n=200) | 0 | 0.0% | 0.0% | 66.3% | 0.22 |
| strategy-oportunista-5 | 200 | 20 | 0.0% | 82.5% (n=200) | 0 | 0.0% | 0.0% | 44.7% | 0.26 |
| strategy-traidor-3 | 200 | 20 | 0.0% | 24.0% (n=200) | 0 | 0.0% | 0.0% | 47.4% | 0.36 |
| strategy-traidor-4 | 200 | 20 | 0.0% | 30.5% (n=200) | 0.04 | 4.0% | 0.0% | 39.7% | 0.33 |
| strategy-traidor-5 | 200 | 20 | 0.0% | 62.5% (n=200) | 0 | 0.0% | 0.0% | 31.3% | 0.27 |
| strategy-passivo-3 | 200 | 20 | 0.0% | 60.0% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| strategy-passivo-4 | 200 | 20 | 0.0% | 30.5% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| strategy-passivo-5 | 200 | 20 | 0.0% | 0.0% (n=200) | 0 | 0.0% | 100.0% | 100.0% | 0 |
| fixA1-3 | 1000 | 19.9 | 1.5% | 77.5% (n=1000) | 0.15 | 13.4% | 0.8% | 45.9% | 0.37 |
| fixA1A2-3 | 1000 | 19.9 | 1.5% | 76.8% (n=1000) | 0.12 | 9.5% | 0.7% | 46.4% | 0.36 |
| fixA1-4 | 1000 | 20 | 0.1% | 70.2% (n=1000) | 0.19 | 17.5% | 0.1% | 33.2% | 0.38 |
| fixA1A2-4 | 1000 | 20 | 0.2% | 73.6% (n=1000) | 0.16 | 13.6% | 0.1% | 32.7% | 0.38 |
| fixA1-5 | 1000 | 20 | 0.0% | 66.3% (n=1000) | 0.31 | 28.4% | 0.0% | 30.8% | 0.34 |
| fixA1A2-5 | 1000 | 20 | 0.1% | 66.9% (n=1000) | 0.28 | 23.9% | 0.0% | 31.0% | 0.34 |
| war-turtles-walls-chain | 200 | 20 | 0.0% | 67.5% (n=200) | 0 | 0.0% | 0.0% | 73.0% | 0.17 |
| war-turtles-walls-nochain | 200 | 20 | 0.0% | 70.0% (n=200) | 0 | 0.0% | 0.0% | 73.5% | 0.17 |
| war-turtles-nowalls-chain | 200 | 20 | 0.0% | 61.5% (n=200) | 0 | 0.0% | 0.0% | 72.9% | 0.17 |
| war-turtles-nowalls-nochain | 200 | 20 | 0.0% | 50.0% (n=200) | 0 | 0.0% | 0.0% | 73.3% | 0.16 |
| war-field-walls-chain | 200 | 20 | 0.0% | 61.0% (n=200) | 0.01 | 0.5% | 0.0% | 59.5% | 0.25 |
| war-field-walls-nochain | 200 | 20 | 0.0% | 60.5% (n=200) | 0 | 0.0% | 0.0% | 59.1% | 0.25 |
| war-field-nowalls-chain | 200 | 20 | 0.0% | 54.5% (n=200) | 0 | 0.0% | 0.0% | 58.9% | 0.24 |
| war-field-nowalls-nochain | 200 | 20 | 0.0% | 54.5% (n=200) | 0.01 | 1.0% | 0.0% | 57.8% | 0.25 |
| war-passive-walls-chain | 200 | 20 | 0.0% | 100.0% (n=200) | 0.23 | 23.0% | 0.0% | 86.3% | 0.06 |
| war-passive-walls-nochain | 200 | 20 | 0.0% | 100.0% (n=200) | 0.25 | 24.5% | 0.0% | 86.5% | 0.06 |
| war-passive-nowalls-chain | 200 | 20 | 0.0% | 100.0% (n=200) | 0.25 | 25.0% | 0.0% | 85.1% | 0.06 |
| war-passive-nowalls-nochain | 200 | 20 | 0.0% | 100.0% (n=200) | 0.26 | 25.5% | 0.0% | 85.6% | 0.06 |
| upkeep-linear | 1000 | 20 | 0.0% | 61.9% (n=1000) | 0.04 | 4.2% | 0.0% | 64.9% | 0.2 |
| upkeep-superlinear | 1000 | 20 | 0.0% | 65.6% (n=1000) | 0.01 | 1.3% | 0.3% | 74.2% | 0.16 |
| campaign-mix | 200 | 58.9 | 8.0% | 48.0% (n=200) | 0.4 | 20.5% | 0.0% | 64.0% | 0.15 |
| campaign-fixes | 200 | 57 | 14.5% | 57.5% (n=200) | 0.66 | 32.0% | 0.0% | 48.1% | 0.26 |
| campaign-peace | 200 | 60 | 0.0% | 29.5% (n=200) | 0 | 0.0% | 0.0% | 63.0% | 0.15 |

## Mistura livre, 3 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 497 | 59.6% | 1.79 | 28.3 | 2 | 18.2 | 14.1 | 21.2 | 8.6 | 0.0% | 100.0% | 1.8 |
| mercador | 473 | 50.7% | 1.52 | 27.6 | 1.59 | 14.9 | 11.7 | 21.3 | 7.2 | 0.0% | 59.2% | 3 |
| oportunista | 507 | 49.7% | 1.49 | 27.3 | 1.98 | 18.1 | 14.8 | 20.2 | 7.2 | 0.0% | 96.6% | 1.2 |
| agressivo | 505 | 29.1% | 0.87 | 23.5 | 2.57 | 19.7 | 15.8 | 15.9 | 8 | 0.0% | 100.0% | 1 |
| tartaruga | 502 | 12.5% | 0.38 | 22.6 | 1 | 10.2 | 12 | 17.5 | 4 | 0.0% | 0.0% | — |
| passivo | 516 | 0.4% | 0.01 | 5.2 | 0.99 | 10.4 | 4 | 0 | 112.7 | 0.8% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 2.53 | 0 | 0.0% | 79.8% | 23.4% | 0.0% | 29.6 | 0.02 | 1.36 | 39.8% | 54.0% |
| mercador | 2.4 | 0 | 0.0% | 81.6% | 23.2% | 0.0% | 33.6 | 0 | 1.18 | 38.6% | 49.1% |
| oportunista | 1.16 | 0 | 0.0% | 87.7% | 31.9% | 0.0% | 25.5 | 0.01 | 1.33 | 48.0% | 68.0% |
| agressivo | 0 | 0 | 0.0% | 85.7% | 57.9% | 0.0% | 18.3 | 0.25 | 0.64 | 63.8% | 91.2% |
| tartaruga | 1.66 | 0 | 0.0% | 90.6% | 49.8% | 0.0% | 19.9 | 0.03 | 0.71 | 61.5% | 107.4% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 112.7 | 0 | 1.54 | 27.4% | 23.1% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.08 | 0.00 | 0.11 | 0.04 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| mercador | 0.07 | 0.00 | 0.13 | 0.00 | 0.00 | 0.00 | 0.00 | 0.03 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.11 | 0.05 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.06 | 0.10 | 0.00 | 0.00 | 0.00 | 0.08 | 0.00 |
| tartaruga | 0.04 | 0.00 | 0.07 | 0.00 | 0.05 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 566 | 55.5% | 1.66 | 24.6 | 1.74 | 15 | 12.5 | 18.3 | 31.3 | 0.2% | 51.6% | 1.4 |
| isolacionista | 620 | 34.0% | 1.02 | 22.3 | 1.73 | 16.7 | 11.7 | 15.4 | 27.7 | 0.0% | 63.5% | 1.7 |
| diplomata | 610 | 30.8% | 0.92 | 22.1 | 1.55 | 13.9 | 11.9 | 16.1 | 25.1 | 0.5% | 46.6% | 1.5 |
| expansionista | 589 | 27.8% | 0.84 | 22.3 | 1.77 | 15.5 | 12 | 15.9 | 24.2 | 0.0% | 66.0% | 1.8 |
| militarista | 615 | 20.0% | 0.60 | 20.1 | 1.66 | 15 | 12.2 | 13.8 | 18.2 | 0.0% | 67.2% | 1.5 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor + mercador | 94 | 89.4% | 2.68 | 31 | 2.04 | 18.1 | 17.1 | 24 | 10.8 | 0.0% | 100.0% | 2 |
| oportunista + mercador | 104 | 85.6% | 2.57 | 30.8 | 2.14 | 19 | 17.1 | 23.5 | 9.2 | 0.0% | 100.0% | 1.3 |
| mercador + isolacionista | 94 | 80.9% | 2.43 | 30.2 | 1.98 | 19.3 | 11.7 | 22.7 | 9.8 | 0.0% | 97.9% | 3 |
| agressivo + mercador | 94 | 76.6% | 2.30 | 28.9 | 3.15 | 21.9 | 15.8 | 20.6 | 11.5 | 0.0% | 100.0% | 1 |
| traidor + diplomata | 110 | 71.8% | 2.15 | 29.1 | 2.01 | 17.9 | 13.8 | 22.1 | 9 | 0.0% | 100.0% | 2.2 |
| mercador + expansionista | 99 | 61.6% | 1.85 | 28.9 | 1.89 | 16.7 | 11.4 | 22.1 | 9.8 | 0.0% | 88.9% | 3.1 |
| traidor + isolacionista | 100 | 55.0% | 1.65 | 27.7 | 1.96 | 19.3 | 13.7 | 20.1 | 9.3 | 0.0% | 100.0% | 1.8 |
| oportunista + diplomata | 97 | 54.6% | 1.64 | 27.3 | 1.82 | 16.6 | 14.9 | 20.6 | 6.2 | 0.0% | 82.5% | 1 |
| mercador + mercador | 87 | 48.3% | 1.45 | 27.6 | 1 | 10 | 11 | 22.6 | 6.3 | 0.0% | 0.0% | — |
| oportunista + isolacionista | 102 | 48.0% | 1.44 | 26.7 | 1.99 | 19.5 | 14.8 | 19.1 | 8.4 | 0.0% | 100.0% | 1.3 |
| traidor + expansionista | 96 | 42.7% | 1.28 | 27.6 | 2 | 17.8 | 13.6 | 20.6 | 8.6 | 0.0% | 100.0% | 2.2 |
| mercador + militarista | 102 | 39.2% | 1.18 | 26.3 | 1.98 | 17.5 | 12.3 | 19.4 | 5.9 | 0.0% | 98.0% | 2.9 |
| traidor + militarista | 97 | 38.1% | 1.14 | 26.1 | 1.99 | 17.8 | 12.5 | 19.2 | 5.4 | 0.0% | 100.0% | 1 |
| tartaruga + mercador | 84 | 32.1% | 0.96 | 26.2 | 1 | 10 | 11 | 21.2 | 6.5 | 0.0% | 0.0% | — |
| oportunista + militarista | 102 | 30.4% | 0.91 | 25.7 | 1.96 | 17.6 | 12.2 | 18.8 | 5.2 | 0.0% | 100.0% | 1 |
| oportunista + expansionista | 102 | 29.4% | 0.88 | 25.8 | 1.98 | 17.8 | 14.7 | 18.8 | 7 | 0.0% | 100.0% | 1.3 |
| agressivo + diplomata | 94 | 28.7% | 0.86 | 24.6 | 2.6 | 19.8 | 15.4 | 17 | 7.9 | 0.0% | 100.0% | 1 |
| agressivo + expansionista | 103 | 25.2% | 0.76 | 23.7 | 2.62 | 19.9 | 15.5 | 16 | 7.9 | 0.0% | 100.0% | 1 |
| mercador + diplomata | 91 | 23.1% | 0.69 | 24.9 | 1 | 10 | 12 | 19.9 | 3.9 | 0.0% | 0.0% | — |
| agressivo + isolacionista | 100 | 17.0% | 0.51 | 23.6 | 2.62 | 20.5 | 15.3 | 16 | 7.9 | 0.0% | 100.0% | 1 |
| tartaruga + isolacionista | 108 | 11.1% | 0.33 | 22.8 | 1 | 11.1 | 12 | 17.4 | 3.9 | 0.0% | 0.0% | — |
| tartaruga + militarista | 106 | 9.4% | 0.28 | 19 | 1 | 9.7 | 12.9 | 14 | 2.4 | 0.0% | 0.0% | — |
| tartaruga + diplomata | 109 | 7.3% | 0.22 | 23.4 | 1 | 9.9 | 12 | 18.4 | 3.9 | 0.0% | 0.0% | — |
| tartaruga + expansionista | 95 | 6.3% | 0.19 | 22.2 | 1 | 9.9 | 12 | 17.2 | 4.1 | 0.0% | 0.0% | — |
| agressivo + militarista | 114 | 4.4% | 0.13 | 17.8 | 1.99 | 16.9 | 17 | 10.9 | 5.6 | 0.0% | 100.0% | 1 |
| passivo + isolacionista | 116 | 1.7% | 0.05 | 6 | 1 | 12 | 4 | 0 | 114 | 0.0% | 0.0% | — |
| passivo + diplomata | 109 | 0.0% | 0.00 | 4.9 | 0.97 | 9.7 | 3.9 | 0 | 111.8 | 2.8% | 0.0% | — |
| passivo + expansionista | 94 | 0.0% | 0.00 | 5 | 1 | 10 | 4 | 0 | 112 | 0.0% | 0.0% | — |
| passivo + mercador | 103 | 0.0% | 0.00 | 5 | 0.99 | 9.9 | 3 | 0 | 131.9 | 1.0% | 0.0% | — |
| passivo + militarista | 94 | 0.0% | 0.00 | 5 | 1 | 10 | 5 | 0 | 92 | 0.0% | 0.0% | — |

## Mistura livre, 4 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 680 | 50.0% | 2.00 | 27.6 | 2 | 17.9 | 15.9 | 20.5 | 8.6 | 0.0% | 97.5% | 1.9 |
| mercador | 664 | 36.9% | 1.48 | 26.5 | 1.56 | 14.5 | 13.3 | 20.3 | 6.6 | 0.2% | 58.0% | 2.5 |
| oportunista | 672 | 34.2% | 1.37 | 25.7 | 1.99 | 17.9 | 17 | 18.6 | 6.8 | 0.0% | 95.1% | 1.1 |
| agressivo | 647 | 19.9% | 0.80 | 22.4 | 2.32 | 19 | 18.4 | 15 | 6.9 | 0.0% | 100.0% | 1 |
| tartaruga | 688 | 8.1% | 0.33 | 22.4 | 1 | 10 | 12 | 17.3 | 4.2 | 0.0% | 0.0% | — |
| passivo | 649 | 0.0% | 0.00 | 4.9 | 0.93 | 9.7 | 3.7 | 0 | 111.7 | 6.9% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 3.36 | 0.02 | 0.0% | 75.1% | 23.6% | 0.0% | 32.1 | 0.1 | 1.5 | 39.8% | 60.2% |
| mercador | 3.08 | 0 | 0.0% | 80.2% | 27.7% | 0.0% | 33 | 0.1 | 1.28 | 42.0% | 64.3% |
| oportunista | 1.42 | 0 | 0.0% | 84.5% | 38.3% | 0.0% | 25.8 | 0.09 | 1.26 | 53.1% | 84.1% |
| agressivo | 0 | 0 | 0.0% | 86.2% | 64.6% | 0.0% | 16.1 | 0.4 | 0.81 | 72.2% | 122.6% |
| tartaruga | 2.19 | 0 | 0.0% | 89.7% | 48.1% | 0.0% | 20.3 | 0.07 | 1.01 | 58.6% | 105.8% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 111.7 | 0 | 1.5 | 27.4% | 23.1% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.11 | 0.00 | 0.11 | 0.06 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| mercador | 0.10 | 0.00 | 0.11 | 0.03 | 0.00 | 0.00 | 0.00 | 0.03 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.10 | 0.08 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.04 | 0.13 | 0.00 | 0.00 | 0.00 | 0.07 | 0.00 |
| tartaruga | 0.05 | 0.00 | 0.06 | 0.00 | 0.05 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 800 | 39.3% | 1.57 | 23.5 | 1.66 | 14.4 | 13.6 | 17.3 | 31.2 | 1.6% | 47.5% | 1.4 |
| isolacionista | 825 | 26.5% | 1.06 | 22.1 | 1.66 | 16.4 | 13.3 | 15.3 | 25.3 | 1.1% | 64.2% | 1.7 |
| expansionista | 764 | 26.0% | 1.04 | 21.9 | 1.7 | 15.1 | 13.6 | 15.5 | 21.8 | 1.6% | 66.6% | 1.7 |
| diplomata | 805 | 22.0% | 0.88 | 21.5 | 1.49 | 13.5 | 13.4 | 15.6 | 22.9 | 1.0% | 45.8% | 1.5 |
| militarista | 806 | 11.3% | 0.45 | 19.4 | 1.65 | 14.7 | 13 | 13.2 | 17.2 | 0.5% | 67.7% | 1.4 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor + mercador | 141 | 72.3% | 2.89 | 29.8 | 2.04 | 17.8 | 19.5 | 22.7 | 10.1 | 0.0% | 95.0% | 2.1 |
| mercador + isolacionista | 137 | 70.8% | 2.83 | 29.3 | 1.95 | 19 | 13.3 | 21.9 | 10.7 | 0.0% | 97.1% | 2.5 |
| oportunista + mercador | 125 | 67.2% | 2.69 | 29.1 | 2.22 | 19.2 | 20.3 | 21.6 | 8.4 | 0.0% | 94.4% | 1.1 |
| mercador + expansionista | 130 | 59.2% | 2.37 | 28.2 | 1.9 | 16.7 | 13.4 | 21.4 | 9.3 | 0.0% | 91.5% | 2.3 |
| agressivo + mercador | 126 | 57.1% | 2.29 | 28.3 | 2.92 | 21.2 | 17.3 | 20.2 | 10.5 | 0.0% | 100.0% | 1 |
| traidor + diplomata | 145 | 55.9% | 2.23 | 27.9 | 1.98 | 17.3 | 15.9 | 21 | 8.7 | 0.0% | 97.2% | 2.2 |
| traidor + isolacionista | 130 | 51.5% | 2.06 | 27.9 | 2.01 | 19.5 | 14.8 | 20.3 | 9.8 | 0.0% | 96.9% | 2.2 |
| traidor + expansionista | 128 | 45.3% | 1.81 | 27.2 | 2 | 17.4 | 15 | 20.2 | 9.2 | 0.0% | 98.4% | 2.1 |
| oportunista + diplomata | 130 | 36.9% | 1.48 | 25.6 | 1.82 | 16.2 | 17 | 19 | 6.2 | 0.0% | 83.1% | 1 |
| oportunista + expansionista | 139 | 27.3% | 1.09 | 24.9 | 2.01 | 17.7 | 17 | 17.9 | 6.8 | 0.0% | 98.6% | 1.3 |
| mercador + mercador | 118 | 26.3% | 1.05 | 26.5 | 1.01 | 9.8 | 12.2 | 21.5 | 5.7 | 0.8% | 1.7% | 1 |
| traidor + militarista | 136 | 23.5% | 0.94 | 25.1 | 1.99 | 17.5 | 13.9 | 18.1 | 5.4 | 0.0% | 100.0% | 1 |
| oportunista + isolacionista | 135 | 23.0% | 0.92 | 25.4 | 1.94 | 18.8 | 16.7 | 18 | 7.8 | 0.0% | 98.5% | 1.2 |
| oportunista + militarista | 143 | 20.3% | 0.81 | 23.9 | 1.97 | 17.4 | 14.2 | 17 | 4.8 | 0.0% | 100.0% | 1 |
| mercador + militarista | 135 | 18.5% | 0.74 | 24.7 | 1.9 | 16.5 | 14.2 | 18 | 3.8 | 0.0% | 94.8% | 2.6 |
| agressivo + diplomata | 117 | 17.9% | 0.72 | 23.2 | 2.31 | 19.1 | 18.6 | 15.7 | 6.8 | 0.0% | 100.0% | 1 |
| tartaruga + mercador | 139 | 18.0% | 0.72 | 25.7 | 1 | 9.8 | 11.3 | 20.7 | 6.3 | 0.0% | 0.0% | — |
| agressivo + expansionista | 127 | 17.3% | 0.69 | 21.8 | 2.28 | 19 | 19 | 14.3 | 6.7 | 0.0% | 100.0% | 1 |
| mercador + diplomata | 144 | 10.4% | 0.42 | 24 | 1.02 | 9.9 | 13.1 | 19 | 3.7 | 0.0% | 2.1% | 1 |
| agressivo + isolacionista | 138 | 8.7% | 0.35 | 21.9 | 2.19 | 19.4 | 19.6 | 14.4 | 6.6 | 0.0% | 100.0% | 1 |
| tartaruga + diplomata | 138 | 8.7% | 0.35 | 22.8 | 1 | 9.7 | 12.1 | 17.8 | 4 | 0.0% | 0.0% | — |
| tartaruga + isolacionista | 148 | 8.1% | 0.32 | 22.6 | 1 | 11.3 | 12.1 | 17.1 | 4.5 | 0.0% | 0.0% | — |
| tartaruga + expansionista | 131 | 3.1% | 0.12 | 21.8 | 1 | 9.7 | 12.1 | 16.8 | 4.2 | 0.0% | 0.0% | — |
| tartaruga + militarista | 132 | 2.3% | 0.09 | 18.8 | 1 | 9.5 | 12.7 | 13.8 | 2 | 0.0% | 0.0% | — |
| agressivo + militarista | 139 | 1.4% | 0.06 | 17.5 | 1.98 | 16.6 | 17.3 | 10.6 | 4.2 | 0.0% | 100.0% | 1 |
| passivo + diplomata | 131 | 0.0% | 0.00 | 4.7 | 0.94 | 9.4 | 3.8 | 0 | 110.8 | 6.1% | 0.0% | — |
| passivo + expansionista | 109 | 0.0% | 0.00 | 4.4 | 0.89 | 8.9 | 3.6 | 0 | 109 | 11.0% | 0.0% | — |
| passivo + isolacionista | 137 | 0.0% | 0.00 | 5.6 | 0.93 | 11.2 | 3.7 | 0 | 112.8 | 6.6% | 0.0% | — |
| passivo + mercador | 151 | 0.0% | 0.00 | 4.6 | 0.92 | 9.2 | 2.8 | 0 | 129.6 | 7.9% | 0.0% | — |
| passivo + militarista | 121 | 0.0% | 0.00 | 4.8 | 0.97 | 9.7 | 4.8 | 0 | 91.7 | 3.3% | 0.0% | — |

## Mistura livre, 5 jogadores (motor como está)

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 801 | 33.7% | 1.69 | 23.4 | 1.89 | 16.8 | 20.6 | 16.6 | 5.6 | 0.0% | 85.5% | 2 |
| mercador | 857 | 31.9% | 1.59 | 23.5 | 1.52 | 14 | 17.3 | 17.3 | 5 | 0.0% | 52.3% | 2.3 |
| oportunista | 840 | 21.3% | 1.07 | 21.7 | 1.97 | 17.4 | 22.3 | 14.7 | 5 | 0.0% | 93.5% | 1.1 |
| tartaruga | 807 | 17.3% | 0.87 | 22.3 | 1 | 10 | 12.5 | 17.2 | 3.9 | 0.0% | 0.0% | — |
| agressivo | 845 | 16.3% | 0.82 | 20.1 | 2.04 | 17.6 | 22.4 | 13 | 5.6 | 0.0% | 100.0% | 1 |
| passivo | 850 | 0.0% | 0.00 | 4.7 | 0.91 | 9.5 | 3.7 | 0 | 109.6 | 8.9% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 2.43 | 0 | 0.0% | 76.8% | 49.5% | 0.0% | 27.2 | 0.39 | 0.88 | 59.1% | 111.4% |
| mercador | 2.43 | 0 | 0.0% | 81.4% | 45.2% | 0.0% | 30.1 | 0.31 | 0.98 | 59.4% | 115.4% |
| oportunista | 1.09 | 0 | 0.0% | 81.2% | 64.2% | 0.0% | 20.8 | 0.36 | 0.65 | 72.5% | 135.2% |
| tartaruga | 2.02 | 0 | 0.0% | 88.4% | 48.9% | 0.0% | 20.8 | 0.13 | 1.09 | 59.4% | 111.8% |
| agressivo | 0 | 0 | 0.0% | 84.7% | 79.0% | 0.0% | 12.2 | 0.63 | 0.52 | 86.3% | 169.3% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 109.6 | 0 | 1.5 | 28.7% | 23.2% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.07 | 0.00 | 0.05 | 0.13 | 0.00 | 0.00 | 0.00 | 0.04 | 0.00 |
| mercador | 0.07 | 0.00 | 0.06 | 0.08 | 0.00 | 0.00 | 0.00 | 0.03 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.05 | 0.15 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| tartaruga | 0.05 | 0.00 | 0.05 | 0.01 | 0.06 | 0.00 | 0.00 | 0.00 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.02 | 0.18 | 0.00 | 0.00 | 0.00 | 0.05 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 1045 | 42.7% | 2.13 | 21.9 | 1.54 | 14 | 16.7 | 15.9 | 27.9 | 2.7% | 47.6% | 1.5 |
| isolacionista | 961 | 20.1% | 1.00 | 19.4 | 1.57 | 15.4 | 16.9 | 12.8 | 24 | 1.6% | 59.0% | 1.7 |
| diplomata | 1014 | 15.9% | 0.79 | 19 | 1.46 | 13.3 | 16.8 | 13.1 | 21.5 | 1.0% | 46.7% | 1.3 |
| expansionista | 960 | 15.3% | 0.77 | 19.2 | 1.62 | 14.5 | 17.5 | 13 | 20.8 | 0.7% | 62.1% | 1.6 |
| militarista | 1020 | 5.2% | 0.26 | 16.6 | 1.58 | 14 | 14.3 | 10.5 | 19.6 | 1.6% | 61.7% | 1.3 |

### Estratégia + traço

| par | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| oportunista + mercador | 181 | 60.2% | 3.01 | 25.7 | 2.14 | 19 | 25.1 | 18.3 | 7.7 | 0.0% | 92.3% | 1.2 |
| traidor + mercador | 168 | 57.1% | 2.86 | 26.4 | 1.96 | 17.3 | 22.8 | 19.5 | 7.9 | 0.0% | 79.8% | 2.4 |
| agressivo + mercador | 172 | 52.3% | 2.62 | 25.4 | 2.15 | 19 | 23.7 | 18 | 7.2 | 0.0% | 100.0% | 1 |
| mercador + mercador | 159 | 47.8% | 2.39 | 25.6 | 1.15 | 10.9 | 15.4 | 20.3 | 5.2 | 0.0% | 15.1% | 2 |
| mercador + isolacionista | 190 | 44.7% | 2.24 | 24.3 | 1.79 | 17.1 | 19.3 | 17.4 | 6.4 | 0.0% | 80.0% | 2.4 |
| tartaruga + mercador | 181 | 41.4% | 2.07 | 25.3 | 1 | 9.8 | 11.8 | 20.3 | 5.8 | 0.0% | 0.0% | — |
| traidor + isolacionista | 142 | 39.4% | 1.97 | 23.8 | 1.85 | 17.5 | 20.6 | 16.8 | 6.1 | 0.0% | 85.2% | 2.3 |
| mercador + expansionista | 159 | 35.2% | 1.76 | 23.8 | 1.81 | 16 | 19.5 | 17.1 | 5.8 | 0.0% | 81.1% | 2.4 |
| traidor + diplomata | 172 | 34.9% | 1.74 | 23.4 | 1.85 | 16.3 | 21 | 16.7 | 5.8 | 0.0% | 83.1% | 2 |
| traidor + expansionista | 158 | 27.2% | 1.36 | 23.3 | 1.86 | 16.4 | 20.8 | 16.5 | 5.9 | 0.0% | 86.1% | 2.3 |
| mercador + diplomata | 184 | 19.6% | 0.98 | 22.3 | 1.06 | 10.2 | 15.7 | 17.2 | 4.1 | 0.0% | 6.0% | 1 |
| oportunista + diplomata | 154 | 15.6% | 0.78 | 20.9 | 1.84 | 16.2 | 23.2 | 14.3 | 4.4 | 0.0% | 86.4% | 1.1 |
| tartaruga + diplomata | 156 | 13.5% | 0.67 | 22.5 | 1 | 9.7 | 12.7 | 17.5 | 3.8 | 0.0% | 0.0% | — |
| oportunista + isolacionista | 161 | 12.4% | 0.62 | 21.3 | 1.91 | 17.7 | 22.4 | 14.3 | 5.5 | 0.0% | 92.5% | 1.2 |
| mercador + militarista | 165 | 12.1% | 0.61 | 21.4 | 1.79 | 15.7 | 16.6 | 14.8 | 3.3 | 0.0% | 80.0% | 2.2 |
| tartaruga + expansionista | 164 | 12.2% | 0.61 | 21.9 | 1 | 9.8 | 12.5 | 16.9 | 3.7 | 0.0% | 0.0% | — |
| tartaruga + isolacionista | 157 | 11.5% | 0.57 | 22.3 | 1 | 11.3 | 12.9 | 16.8 | 4.2 | 0.0% | 0.0% | — |
| agressivo + diplomata | 187 | 10.7% | 0.53 | 19.8 | 2.04 | 17.4 | 23.5 | 12.7 | 5.8 | 0.0% | 100.0% | 1 |
| agressivo + isolacionista | 145 | 9.7% | 0.48 | 19.1 | 2.03 | 18.1 | 23.5 | 11.9 | 6.5 | 0.0% | 100.0% | 1 |
| oportunista + expansionista | 158 | 9.5% | 0.47 | 20.7 | 1.95 | 17.2 | 23.2 | 13.8 | 5.2 | 0.0% | 96.2% | 1.2 |
| traidor + militarista | 161 | 9.3% | 0.47 | 20.1 | 1.91 | 16.7 | 17.8 | 13.3 | 2.3 | 0.0% | 93.8% | 1 |
| agressivo + expansionista | 179 | 7.3% | 0.36 | 19.2 | 2.04 | 17.5 | 23.3 | 12.1 | 5.4 | 0.0% | 100.0% | 1 |
| oportunista + militarista | 186 | 5.9% | 0.30 | 19.7 | 1.96 | 16.9 | 17.9 | 12.8 | 2.4 | 0.0% | 98.9% | 1 |
| tartaruga + militarista | 149 | 4.0% | 0.20 | 18.9 | 1 | 9.6 | 12.7 | 13.9 | 1.5 | 0.0% | 0.0% | — |
| agressivo + militarista | 162 | 0.6% | 0.03 | 16.8 | 1.96 | 16.1 | 17.8 | 10.1 | 3 | 0.0% | 100.0% | 1 |
| passivo + diplomata | 161 | 0.0% | 0.00 | 4.7 | 0.94 | 9.4 | 3.8 | 0 | 109.7 | 6.2% | 0.0% | — |
| passivo + expansionista | 142 | 0.0% | 0.00 | 4.8 | 0.95 | 9.5 | 3.8 | 0 | 110.8 | 4.9% | 0.0% | — |
| passivo + isolacionista | 166 | 0.0% | 0.00 | 5.5 | 0.91 | 10.9 | 3.6 | 0 | 111.5 | 9.0% | 0.0% | — |
| passivo + mercador | 184 | 0.0% | 0.00 | 4.2 | 0.85 | 8.5 | 2.5 | 0 | 127 | 15.2% | 0.0% | — |
| passivo + militarista | 197 | 0.0% | 0.00 | 4.6 | 0.92 | 9.2 | 4.6 | 0 | 90.9 | 8.1% | 0.0% | — |

## Prévia A1 (2 regiões iniciais), 3 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 509 | 53.2% | 1.60 | 27.3 | 3.6 | 33.2 | 29.8 | 16.1 | 11.1 | 1.4% | 98.8% | 1 |
| mercador | 463 | 47.9% | 1.44 | 31.3 | 2.11 | 21 | 19.1 | 23.4 | 12.1 | 1.7% | 33.9% | 2.4 |
| oportunista | 541 | 40.3% | 1.21 | 27.8 | 3.02 | 28.5 | 29.6 | 18.1 | 9.1 | 1.1% | 92.8% | 1.4 |
| traidor | 477 | 36.7% | 1.10 | 28.8 | 2.99 | 28.4 | 28 | 19 | 11.1 | 0.6% | 88.7% | 2 |
| tartaruga | 504 | 21.0% | 0.63 | 27.5 | 1.75 | 18.1 | 16.7 | 20.3 | 8 | 2.8% | 0.0% | — |
| passivo | 506 | 1.6% | 0.05 | 5.7 | 1.36 | 14.2 | 5.4 | 0.1 | 150.7 | 22.3% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0 | 0 | 0.0% | 65.3% | 54.9% | 0.0% | 18.3 | 0.28 | 1.87 | 61.3% | 113.6% |
| mercador | 3.11 | 0 | 0.0% | 67.1% | 22.8% | 0.7% | 41.1 | 0.27 | 2.43 | 42.9% | 69.6% |
| oportunista | 1.24 | 0 | 0.0% | 71.7% | 45.2% | 1.2% | 30.4 | 0.28 | 1.98 | 57.0% | 103.4% |
| traidor | 3.14 | 0.51 | 0.0% | 65.3% | 29.8% | 1.9% | 37.9 | 0.23 | 2.4 | 47.7% | 84.6% |
| tartaruga | 2.63 | 0 | 0.0% | 74.9% | 27.5% | 0.1% | 27.4 | 0.13 | 2.29 | 45.1% | 72.1% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 150.5 | 0 | 2.19 | 28.0% | 23.7% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0.00 | 0.00 | 0.06 | 0.25 | 0.00 | 0.08 | 0.00 | 0.10 | 0.00 |
| mercador | 0.09 | 0.00 | 0.27 | 0.06 | 0.00 | 0.00 | 0.01 | 0.02 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.11 | 0.22 | 0.00 | 0.00 | 0.00 | 0.07 | 0.00 |
| traidor | 0.10 | 0.03 | 0.14 | 0.18 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| tartaruga | 0.06 | 0.00 | 0.12 | 0.03 | 0.13 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 622 | 49.0% | 1.47 | 27.5 | 2.72 | 25.4 | 24.3 | 18.5 | 40.4 | 5.5% | 53.9% | 1.6 |
| isolacionista | 612 | 38.6% | 1.16 | 25.8 | 2.51 | 26.8 | 21.4 | 16.5 | 37.8 | 3.4% | 55.2% | 1.6 |
| diplomata | 564 | 30.1% | 0.90 | 23.6 | 2.21 | 21 | 20.9 | 15.8 | 34 | 8.5% | 45.9% | 1.6 |
| expansionista | 618 | 28.8% | 0.86 | 24.5 | 2.46 | 23.3 | 21.3 | 16 | 34.2 | 3.9% | 47.9% | 1.5 |
| militarista | 584 | 19.0% | 0.57 | 21.6 | 2.48 | 23 | 19.5 | 13.2 | 22.5 | 4.1% | 61.1% | 1.3 |

## Prévia A1 + A2 (2 regiões, 1 ataque por exército), 3 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 504 | 51.6% | 1.55 | 26.2 | 3.41 | 31.4 | 30.1 | 15.5 | 9.7 | 0.2% | 100.0% | 1 |
| mercador | 489 | 43.6% | 1.31 | 31.6 | 2.16 | 21.4 | 19.5 | 23.5 | 11.9 | 0.8% | 36.0% | 2.5 |
| traidor | 478 | 42.3% | 1.27 | 29.5 | 3.03 | 28.8 | 28.5 | 19.5 | 10.8 | 0.2% | 90.2% | 1.8 |
| oportunista | 515 | 41.4% | 1.24 | 28 | 3.05 | 28.8 | 30.1 | 18.2 | 8.9 | 0.6% | 92.6% | 1.4 |
| tartaruga | 522 | 20.1% | 0.60 | 27.7 | 1.8 | 18.6 | 17.2 | 20.2 | 8 | 1.9% | 0.0% | — |
| passivo | 492 | 1.4% | 0.04 | 5.9 | 1.41 | 14.6 | 5.7 | 0 | 151.4 | 19.9% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0 | 0 | 0.0% | 66.2% | 59.1% | 0.0% | 18.5 | 0.28 | 1.87 | 64.6% | 126.5% |
| mercador | 3.2 | 0 | 0.0% | 66.6% | 23.6% | 0.7% | 41.3 | 0.2 | 2.63 | 43.3% | 70.3% |
| traidor | 2.97 | 0.39 | 0.0% | 65.7% | 30.0% | 1.7% | 37.7 | 0.17 | 2.5 | 48.7% | 86.0% |
| oportunista | 1.36 | 0 | 0.0% | 72.4% | 43.4% | 0.9% | 31 | 0.19 | 2 | 57.0% | 105.0% |
| tartaruga | 2.72 | 0 | 0.0% | 75.4% | 27.4% | 0.0% | 27.5 | 0.13 | 2.38 | 46.3% | 74.5% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 151.4 | 0 | 2.31 | 28.7% | 23.8% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agressivo | 0.00 | 0.00 | 0.05 | 0.25 | 0.00 | 0.08 | 0.00 | 0.09 | 0.00 |
| mercador | 0.10 | 0.00 | 0.26 | 0.06 | 0.00 | 0.00 | 0.01 | 0.02 | 0.00 |
| traidor | 0.10 | 0.02 | 0.14 | 0.19 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.11 | 0.22 | 0.00 | 0.00 | 0.00 | 0.07 | 0.00 |
| tartaruga | 0.06 | 0.00 | 0.11 | 0.03 | 0.12 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 570 | 52.6% | 1.58 | 28.2 | 2.69 | 25.3 | 24.9 | 19.1 | 37.8 | 4.4% | 53.9% | 1.5 |
| isolacionista | 609 | 34.8% | 1.04 | 25.6 | 2.49 | 26.3 | 21 | 16.4 | 36.6 | 4.9% | 55.5% | 1.7 |
| diplomata | 614 | 32.1% | 0.96 | 24.1 | 2.27 | 21.7 | 22.1 | 16 | 32 | 3.6% | 49.5% | 1.4 |
| expansionista | 632 | 27.8% | 0.84 | 24.5 | 2.5 | 23.6 | 22 | 15.9 | 33.9 | 2.8% | 48.7% | 1.5 |
| militarista | 575 | 20.0% | 0.60 | 21.9 | 2.44 | 22.8 | 19.4 | 13.6 | 24.8 | 3.8% | 57.6% | 1.3 |

## Prévia A1 (2 regiões iniciais), 4 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 681 | 37.7% | 1.51 | 31 | 2.21 | 21.6 | 20.7 | 23 | 12.8 | 1.8% | 45.7% | 2.1 |
| traidor | 697 | 37.0% | 1.48 | 29.8 | 3.22 | 30.1 | 30.8 | 19.6 | 13.3 | 3.0% | 90.0% | 1.9 |
| agressivo | 630 | 33.5% | 1.34 | 26.3 | 3.46 | 31.6 | 30.6 | 15.7 | 9.9 | 2.2% | 99.2% | 1 |
| oportunista | 666 | 27.9% | 1.12 | 27.4 | 3.07 | 28.5 | 30.4 | 17.7 | 9.4 | 1.4% | 95.9% | 1.3 |
| tartaruga | 658 | 13.2% | 0.53 | 27.8 | 1.83 | 18.8 | 17.3 | 20.4 | 9.1 | 1.8% | 0.0% | — |
| passivo | 668 | 0.1% | 0.01 | 6.2 | 1.48 | 15.4 | 6 | 0.1 | 152.7 | 18.1% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 3.55 | 0 | 0.0% | 64.6% | 23.3% | 0.9% | 40.8 | 0.21 | 2.69 | 43.5% | 72.1% |
| traidor | 3.27 | 0.2 | 0.0% | 60.8% | 27.7% | 2.9% | 38 | 0.25 | 2.52 | 46.7% | 86.8% |
| agressivo | 0 | 0 | 0.0% | 66.1% | 58.3% | 0.0% | 17.2 | 0.28 | 2.21 | 63.0% | 118.4% |
| oportunista | 1.55 | 0 | 0.0% | 69.8% | 43.0% | 0.6% | 29.5 | 0.28 | 2.24 | 57.0% | 103.5% |
| tartaruga | 3.3 | 0 | 0.0% | 72.8% | 22.9% | 0.1% | 29.2 | 0.11 | 2.73 | 43.1% | 69.1% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 152.6 | 0 | 2.37 | 28.7% | 23.7% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 0.11 | 0.00 | 0.25 | 0.08 | 0.00 | 0.00 | 0.01 | 0.02 | 0.00 |
| traidor | 0.10 | 0.01 | 0.14 | 0.24 | 0.00 | 0.00 | 0.00 | 0.08 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.05 | 0.27 | 0.00 | 0.04 | 0.00 | 0.10 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.10 | 0.23 | 0.00 | 0.00 | 0.00 | 0.08 | 0.00 |
| tartaruga | 0.08 | 0.00 | 0.12 | 0.03 | 0.13 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 786 | 40.7% | 1.63 | 28.2 | 2.76 | 25.6 | 25.4 | 19.2 | 40.8 | 6.2% | 50.0% | 1.5 |
| isolacionista | 791 | 29.5% | 1.18 | 25.9 | 2.61 | 27.6 | 23.1 | 16.3 | 39.1 | 3.0% | 61.6% | 1.7 |
| diplomata | 845 | 23.8% | 0.95 | 24.2 | 2.29 | 21.5 | 21.5 | 16.4 | 33 | 7.6% | 47.1% | 1.5 |
| expansionista | 770 | 21.4% | 0.86 | 24.5 | 2.55 | 24 | 23.5 | 15.9 | 35.5 | 3.2% | 54.3% | 1.5 |
| militarista | 808 | 10.0% | 0.40 | 21.2 | 2.51 | 23.2 | 19.8 | 12.9 | 25 | 3.3% | 62.6% | 1.3 |

## Prévia A1 + A2 (2 regiões, 1 ataque por exército), 4 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 628 | 39.0% | 1.56 | 30.1 | 3.32 | 31.2 | 31.2 | 19.5 | 12.8 | 0.5% | 91.7% | 1.8 |
| mercador | 648 | 36.6% | 1.46 | 30.7 | 2.23 | 21.8 | 21.1 | 22.6 | 12.2 | 1.1% | 47.1% | 2.1 |
| agressivo | 726 | 33.1% | 1.32 | 26.1 | 3.39 | 31 | 30.7 | 15.7 | 9.3 | 1.1% | 100.0% | 1 |
| oportunista | 665 | 31.0% | 1.24 | 27.4 | 3.08 | 28.5 | 30.5 | 17.7 | 9.2 | 0.8% | 96.2% | 1.3 |
| tartaruga | 699 | 10.2% | 0.41 | 27.7 | 1.82 | 18.7 | 17.6 | 20.3 | 8.3 | 1.0% | 0.0% | — |
| passivo | 634 | 0.2% | 0.01 | 6.1 | 1.44 | 15 | 5.8 | 0 | 152.3 | 19.7% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 3.19 | 0.22 | 0.0% | 61.3% | 30.7% | 3.1% | 37.2 | 0.31 | 2.43 | 47.8% | 87.7% |
| mercador | 3.43 | 0 | 0.0% | 65.6% | 25.2% | 0.8% | 40.7 | 0.23 | 2.62 | 44.9% | 75.5% |
| agressivo | 0 | 0 | 0.0% | 66.1% | 59.6% | 0.0% | 17.2 | 0.3 | 2.11 | 63.4% | 117.0% |
| oportunista | 1.52 | 0 | 0.0% | 69.7% | 44.9% | 0.5% | 28.8 | 0.31 | 2.14 | 57.8% | 105.2% |
| tartaruga | 3.2 | 0 | 0.0% | 72.4% | 24.0% | 0.0% | 28.8 | 0.1 | 2.73 | 43.6% | 72.0% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 152.3 | 0 | 2.35 | 28.2% | 23.6% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.10 | 0.01 | 0.14 | 0.24 | 0.00 | 0.00 | 0.00 | 0.08 | 0.00 |
| mercador | 0.11 | 0.00 | 0.24 | 0.09 | 0.00 | 0.00 | 0.01 | 0.02 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.05 | 0.27 | 0.00 | 0.05 | 0.00 | 0.10 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.10 | 0.23 | 0.00 | 0.00 | 0.00 | 0.08 | 0.00 |
| tartaruga | 0.08 | 0.00 | 0.11 | 0.03 | 0.13 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 783 | 40.4% | 1.61 | 28.1 | 2.87 | 26.5 | 26.7 | 18.8 | 41.6 | 4.3% | 52.7% | 1.4 |
| isolacionista | 807 | 31.4% | 1.25 | 26.4 | 2.65 | 28 | 23.4 | 16.7 | 36.3 | 3.0% | 61.1% | 1.6 |
| expansionista | 807 | 22.9% | 0.92 | 24.7 | 2.5 | 23.5 | 22.6 | 16.2 | 33.5 | 3.8% | 53.5% | 1.5 |
| diplomata | 804 | 20.4% | 0.82 | 24.2 | 2.29 | 21.5 | 22.1 | 16.3 | 30.4 | 4.1% | 48.5% | 1.4 |
| militarista | 799 | 10.3% | 0.41 | 20.7 | 2.48 | 22.9 | 20.1 | 12.5 | 22.2 | 4.1% | 65.0% | 1.3 |

## Prévia A1 (2 regiões iniciais), 5 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 851 | 30.2% | 1.51 | 26.2 | 2.85 | 27.6 | 32.1 | 16.8 | 9.9 | 3.1% | 77.4% | 2.3 |
| mercador | 797 | 27.9% | 1.39 | 26.8 | 2.1 | 20.7 | 25.4 | 19.2 | 8 | 2.4% | 30.2% | 2 |
| agressivo | 845 | 25.0% | 1.25 | 23.5 | 2.77 | 26.8 | 30.7 | 14.1 | 8.5 | 4.4% | 95.9% | 1 |
| oportunista | 864 | 22.9% | 1.15 | 24 | 2.67 | 25.4 | 30.8 | 15.3 | 7.8 | 3.4% | 87.0% | 1.4 |
| tartaruga | 821 | 13.6% | 0.68 | 24.9 | 1.78 | 18.2 | 20.1 | 17.9 | 7.7 | 3.3% | 0.0% | — |
| passivo | 822 | 0.0% | 0.00 | 5.6 | 1.33 | 13.8 | 5.4 | 0.2 | 143.7 | 21.2% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 2.74 | 0.17 | 0.0% | 66.3% | 44.4% | 1.1% | 32.4 | 0.41 | 2.25 | 57.9% | 115.6% |
| mercador | 3.12 | 0 | 0.0% | 70.1% | 38.8% | 0.2% | 35.6 | 0.49 | 2.38 | 57.3% | 113.9% |
| agressivo | 0 | 0 | 0.0% | 70.5% | 70.6% | 0.0% | 15.6 | 0.36 | 1.67 | 73.4% | 148.1% |
| oportunista | 1.26 | 0 | 0.0% | 72.0% | 59.4% | 0.2% | 24.2 | 0.44 | 1.85 | 67.9% | 136.1% |
| tartaruga | 2.88 | 0 | 0.0% | 73.2% | 37.9% | 0.0% | 26 | 0.36 | 2.41 | 52.3% | 92.3% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 141.9 | 0 | 2.19 | 28.6% | 23.7% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.08 | 0.01 | 0.07 | 0.25 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| mercador | 0.10 | 0.00 | 0.14 | 0.14 | 0.00 | 0.00 | 0.01 | 0.01 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.04 | 0.26 | 0.00 | 0.04 | 0.00 | 0.07 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.06 | 0.24 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| tartaruga | 0.08 | 0.00 | 0.07 | 0.07 | 0.12 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 1006 | 38.8% | 1.94 | 24.4 | 2.32 | 22.3 | 26.5 | 16.4 | 37.6 | 8.5% | 45.8% | 1.8 |
| isolacionista | 996 | 22.0% | 1.10 | 22.8 | 2.29 | 24.8 | 25.2 | 14.1 | 32.3 | 5.8% | 53.0% | 1.6 |
| expansionista | 1032 | 17.2% | 0.86 | 21.7 | 2.28 | 21.9 | 24.4 | 13.7 | 33 | 6.4% | 49.0% | 1.6 |
| diplomata | 948 | 15.8% | 0.79 | 21.3 | 2.08 | 20 | 24.2 | 13.9 | 28.6 | 6.9% | 42.8% | 1.7 |
| militarista | 1018 | 6.2% | 0.31 | 19.3 | 2.32 | 21.9 | 20.8 | 11.4 | 21.7 | 3.6% | 55.1% | 1.2 |

## Prévia A1 + A2 (2 regiões, 1 ataque por exército), 5 jogadores

### Por estratégia

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 824 | 30.5% | 1.52 | 27 | 3.01 | 29 | 33.1 | 17.1 | 10.6 | 1.3% | 81.3% | 2.5 |
| agressivo | 799 | 26.5% | 1.33 | 23.8 | 2.79 | 26.9 | 31.3 | 14.3 | 7.8 | 3.0% | 97.2% | 1 |
| mercador | 853 | 26.6% | 1.33 | 26.6 | 2.04 | 20 | 24.5 | 19.2 | 7.9 | 2.6% | 29.4% | 2 |
| oportunista | 802 | 23.4% | 1.17 | 24.2 | 2.7 | 25.7 | 30.9 | 15.3 | 7.6 | 1.9% | 86.2% | 1.4 |
| tartaruga | 836 | 14.6% | 0.73 | 25.1 | 1.8 | 18.4 | 20.4 | 18 | 6.8 | 2.4% | 0.0% | — |
| passivo | 886 | 0.0% | 0.00 | 5.8 | 1.38 | 14.3 | 5.6 | 0.1 | 146.4 | 20.9% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 2.95 | 0.22 | 0.0% | 64.5% | 43.1% | 2.0% | 34 | 0.41 | 2.39 | 56.0% | 111.5% |
| agressivo | 0 | 0 | 0.0% | 69.5% | 69.9% | 0.0% | 16.2 | 0.34 | 1.78 | 72.6% | 149.5% |
| mercador | 3.12 | 0 | 0.0% | 70.8% | 39.1% | 0.3% | 35.6 | 0.52 | 2.32 | 57.4% | 113.7% |
| oportunista | 1.32 | 0 | 0.0% | 72.5% | 60.5% | 0.5% | 25 | 0.51 | 1.93 | 68.5% | 135.7% |
| tartaruga | 2.76 | 0 | 0.0% | 73.4% | 39.3% | 0.0% | 26 | 0.35 | 2.39 | 53.2% | 94.8% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 145.2 | 0 | 2.28 | 28.9% | 23.7% |

### Ações por vez de jogador

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 0.09 | 0.01 | 0.08 | 0.25 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| agressivo | 0.00 | 0.00 | 0.04 | 0.27 | 0.00 | 0.04 | 0.00 | 0.07 | 0.00 |
| mercador | 0.10 | 0.00 | 0.14 | 0.14 | 0.00 | 0.00 | 0.01 | 0.01 | 0.00 |
| oportunista | 0.00 | 0.00 | 0.07 | 0.23 | 0.00 | 0.00 | 0.00 | 0.06 | 0.00 |
| tartaruga | 0.07 | 0.00 | 0.08 | 0.07 | 0.12 | 0.00 | 0.00 | 0.00 | 0.00 |
| passivo | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

### Por traço

| traço | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 999 | 38.7% | 1.94 | 24.7 | 2.4 | 23.1 | 26.9 | 16.4 | 40.5 | 7.6% | 47.3% | 1.8 |
| isolacionista | 950 | 23.4% | 1.17 | 22.8 | 2.27 | 24.6 | 24.4 | 14.3 | 34.2 | 4.7% | 50.7% | 1.9 |
| expansionista | 1020 | 17.6% | 0.88 | 21.5 | 2.28 | 21.9 | 24.4 | 13.6 | 33.6 | 6.0% | 47.0% | 1.6 |
| diplomata | 980 | 16.1% | 0.81 | 21.5 | 2.14 | 20.5 | 24.6 | 13.9 | 31.2 | 5.5% | 42.6% | 1.7 |
| militarista | 1051 | 5.0% | 0.25 | 19 | 2.25 | 21.2 | 19.9 | 11.3 | 24.2 | 3.9% | 51.2% | 1.2 |

## Traço fixo: qual estratégia vence

| experimento | estratégia | assentos | vitória | índice | pontos | regiões |
| --- | --- | --- | --- | --- | --- | --- |
| trait-expansionista-3 | mercador | 103 | 75.7% | 2.27 | 28.1 | 1.76 |
| trait-expansionista-3 | oportunista | 93 | 47.3% | 1.42 | 26.1 | 2 |
| trait-expansionista-3 | traidor | 104 | 43.3% | 1.30 | 27.1 | 2 |
| trait-expansionista-3 | agressivo | 97 | 32.0% | 0.96 | 23.6 | 2.68 |
| trait-expansionista-3 | tartaruga | 94 | 2.1% | 0.06 | 22.3 | 1 |
| trait-expansionista-3 | passivo | 109 | 0.0% | 0.00 | 5 | 1 |
| trait-expansionista-4 | mercador | 134 | 62.7% | 2.51 | 27.6 | 1.84 |
| trait-expansionista-4 | traidor | 146 | 46.6% | 1.86 | 27 | 2 |
| trait-expansionista-4 | oportunista | 137 | 26.3% | 1.05 | 25.3 | 1.94 |
| trait-expansionista-4 | agressivo | 135 | 7.4% | 0.30 | 22.4 | 2.32 |
| trait-expansionista-4 | tartaruga | 130 | 1.5% | 0.06 | 21.7 | 1 |
| trait-expansionista-4 | passivo | 118 | 0.0% | 0.00 | 4.7 | 0.94 |
| trait-expansionista-5 | mercador | 172 | 57.0% | 2.85 | 23.6 | 1.8 |
| trait-expansionista-5 | traidor | 156 | 34.6% | 1.73 | 22.8 | 1.78 |
| trait-expansionista-5 | tartaruga | 157 | 15.3% | 0.76 | 21.4 | 1 |
| trait-expansionista-5 | oportunista | 170 | 11.2% | 0.56 | 20.5 | 1.88 |
| trait-expansionista-5 | agressivo | 175 | 2.9% | 0.14 | 18.7 | 2.05 |
| trait-expansionista-5 | passivo | 170 | 0.0% | 0.00 | 4.6 | 0.93 |
| trait-mercador-3 | oportunista | 110 | 81.8% | 2.45 | 31 | 2.33 |
| trait-mercador-3 | traidor | 98 | 79.6% | 2.39 | 30.1 | 2.02 |
| trait-mercador-3 | agressivo | 92 | 26.1% | 0.78 | 28.4 | 3.03 |
| trait-mercador-3 | mercador | 99 | 8.1% | 0.24 | 27.4 | 0.99 |
| trait-mercador-3 | passivo | 99 | 0.0% | 0.00 | 4.8 | 0.97 |
| trait-mercador-3 | tartaruga | 102 | 0.0% | 0.00 | 25.9 | 1 |
| trait-mercador-4 | traidor | 140 | 64.3% | 2.57 | 29.4 | 1.94 |
| trait-mercador-4 | oportunista | 136 | 52.9% | 2.12 | 29.9 | 2.15 |
| trait-mercador-4 | agressivo | 123 | 22.0% | 0.88 | 28 | 2.98 |
| trait-mercador-4 | mercador | 133 | 6.0% | 0.24 | 26.4 | 1.02 |
| trait-mercador-4 | tartaruga | 144 | 2.1% | 0.08 | 25.3 | 1 |
| trait-mercador-4 | passivo | 124 | 0.0% | 0.00 | 4.3 | 0.85 |
| trait-mercador-5 | traidor | 166 | 48.2% | 2.41 | 27.3 | 1.94 |
| trait-mercador-5 | oportunista | 162 | 27.8% | 1.39 | 26 | 2.12 |
| trait-mercador-5 | mercador | 164 | 18.3% | 0.91 | 25.1 | 1.15 |
| trait-mercador-5 | tartaruga | 169 | 16.0% | 0.80 | 25.2 | 1 |
| trait-mercador-5 | agressivo | 169 | 10.7% | 0.53 | 24.9 | 2.01 |
| trait-mercador-5 | passivo | 170 | 0.0% | 0.00 | 3.6 | 0.73 |
| trait-diplomata-3 | traidor | 96 | 83.3% | 2.50 | 28.4 | 2 |
| trait-diplomata-3 | oportunista | 94 | 56.4% | 1.69 | 26.9 | 1.77 |
| trait-diplomata-3 | agressivo | 101 | 34.7% | 1.04 | 24.7 | 2.64 |
| trait-diplomata-3 | mercador | 95 | 31.6% | 0.95 | 24.9 | 1 |
| trait-diplomata-3 | tartaruga | 103 | 1.9% | 0.06 | 23.5 | 1 |
| trait-diplomata-3 | passivo | 111 | 0.0% | 0.00 | 5 | 1 |
| trait-diplomata-4 | traidor | 139 | 74.8% | 2.99 | 27.8 | 1.94 |
| trait-diplomata-4 | oportunista | 123 | 45.5% | 1.82 | 26 | 1.84 |
| trait-diplomata-4 | mercador | 130 | 19.2% | 0.77 | 24.2 | 1.02 |
| trait-diplomata-4 | tartaruga | 144 | 7.6% | 0.31 | 22.9 | 1 |
| trait-diplomata-4 | agressivo | 126 | 3.2% | 0.13 | 22.7 | 2.32 |
| trait-diplomata-4 | passivo | 138 | 0.0% | 0.00 | 4.8 | 0.96 |
| trait-diplomata-5 | traidor | 166 | 56.0% | 2.80 | 24.2 | 1.83 |
| trait-diplomata-5 | mercador | 168 | 25.6% | 1.28 | 22.8 | 1.11 |
| trait-diplomata-5 | tartaruga | 160 | 23.1% | 1.16 | 22.4 | 1 |
| trait-diplomata-5 | oportunista | 172 | 13.4% | 0.67 | 21.9 | 1.82 |
| trait-diplomata-5 | agressivo | 168 | 2.4% | 0.12 | 20 | 2.05 |
| trait-diplomata-5 | passivo | 166 | 0.0% | 0.00 | 4.6 | 0.93 |
| trait-militarista-3 | oportunista | 106 | 64.2% | 1.92 | 26 | 2 |
| trait-militarista-3 | traidor | 99 | 63.6% | 1.91 | 25.9 | 2 |
| trait-militarista-3 | mercador | 102 | 60.8% | 1.82 | 25.6 | 1.95 |
| trait-militarista-3 | tartaruga | 83 | 7.2% | 0.22 | 19 | 1 |
| trait-militarista-3 | agressivo | 98 | 1.0% | 0.03 | 17.8 | 2 |
| trait-militarista-3 | passivo | 112 | 0.0% | 0.00 | 5 | 1 |
| trait-militarista-4 | mercador | 131 | 52.7% | 2.11 | 25.1 | 1.95 |
| trait-militarista-4 | oportunista | 142 | 45.8% | 1.83 | 23.6 | 2 |
| trait-militarista-4 | traidor | 131 | 43.5% | 1.74 | 24.2 | 2 |
| trait-militarista-4 | tartaruga | 137 | 5.1% | 0.20 | 18.9 | 1 |
| trait-militarista-4 | agressivo | 132 | 1.5% | 0.06 | 17.5 | 2 |
| trait-militarista-4 | passivo | 127 | 0.0% | 0.00 | 5 | 1 |
| trait-militarista-5 | mercador | 166 | 50.0% | 2.50 | 20.7 | 1.77 |
| trait-militarista-5 | traidor | 166 | 28.9% | 1.45 | 19.7 | 1.88 |
| trait-militarista-5 | oportunista | 157 | 24.8% | 1.24 | 19.3 | 1.97 |
| trait-militarista-5 | tartaruga | 174 | 14.9% | 0.75 | 18.7 | 1 |
| trait-militarista-5 | agressivo | 170 | 2.4% | 0.12 | 17.1 | 2 |
| trait-militarista-5 | passivo | 167 | 0.0% | 0.00 | 5 | 1 |
| trait-isolacionista-3 | mercador | 104 | 89.4% | 2.68 | 30.4 | 2 |
| trait-isolacionista-3 | traidor | 96 | 50.0% | 1.50 | 27.9 | 2 |
| trait-isolacionista-3 | oportunista | 102 | 39.2% | 1.18 | 26.8 | 2 |
| trait-isolacionista-3 | agressivo | 106 | 12.3% | 0.37 | 23.8 | 2.58 |
| trait-isolacionista-3 | tartaruga | 103 | 5.8% | 0.17 | 22.7 | 1 |
| trait-isolacionista-3 | passivo | 89 | 0.0% | 0.00 | 6 | 1 |
| trait-isolacionista-4 | mercador | 123 | 64.2% | 2.57 | 28.7 | 1.9 |
| trait-isolacionista-4 | traidor | 138 | 50.0% | 2.00 | 27.7 | 2 |
| trait-isolacionista-4 | oportunista | 124 | 33.1% | 1.32 | 26.1 | 1.95 |
| trait-isolacionista-4 | tartaruga | 130 | 4.6% | 0.18 | 22.1 | 1 |
| trait-isolacionista-4 | agressivo | 144 | 3.5% | 0.14 | 22.4 | 2.3 |
| trait-isolacionista-4 | passivo | 141 | 0.0% | 0.00 | 5.5 | 0.92 |
| trait-isolacionista-5 | mercador | 157 | 40.1% | 2.01 | 23.5 | 1.76 |
| trait-isolacionista-5 | traidor | 169 | 37.9% | 1.89 | 23.4 | 1.8 |
| trait-isolacionista-5 | tartaruga | 175 | 22.9% | 1.14 | 22.1 | 1 |
| trait-isolacionista-5 | oportunista | 173 | 18.5% | 0.92 | 21.1 | 1.9 |
| trait-isolacionista-5 | agressivo | 162 | 0.6% | 0.03 | 18.8 | 2.04 |
| trait-isolacionista-5 | passivo | 164 | 0.0% | 0.00 | 5.6 | 0.94 |

## Estratégia fixa: qual traço vence

| experimento | traço | assentos | vitória | índice | pontos | regiões |
| --- | --- | --- | --- | --- | --- | --- |
| strategy-agressivo-3 | mercador | 128 | 100.0% | 3.00 | 27.3 | 2.63 |
| strategy-agressivo-3 | diplomata | 110 | 20.9% | 0.63 | 24.2 | 2.38 |
| strategy-agressivo-3 | isolacionista | 130 | 20.8% | 0.62 | 23.7 | 2.47 |
| strategy-agressivo-3 | expansionista | 110 | 20.0% | 0.60 | 23.6 | 2.48 |
| strategy-agressivo-3 | militarista | 122 | 0.0% | 0.00 | 17.9 | 2 |
| strategy-agressivo-4 | mercador | 142 | 66.2% | 2.65 | 26 | 2.37 |
| strategy-agressivo-4 | isolacionista | 173 | 25.4% | 1.02 | 21 | 2.08 |
| strategy-agressivo-4 | expansionista | 158 | 18.4% | 0.73 | 20.2 | 2.13 |
| strategy-agressivo-4 | diplomata | 171 | 17.5% | 0.70 | 20.2 | 1.96 |
| strategy-agressivo-4 | militarista | 156 | 1.9% | 0.08 | 17 | 1.91 |
| strategy-agressivo-5 | mercador | 200 | 81.5% | 4.07 | 23.4 | 2.07 |
| strategy-agressivo-5 | expansionista | 200 | 7.0% | 0.35 | 18.1 | 2.02 |
| strategy-agressivo-5 | isolacionista | 200 | 6.5% | 0.32 | 18.4 | 2.03 |
| strategy-agressivo-5 | diplomata | 200 | 5.0% | 0.25 | 18.3 | 2 |
| strategy-agressivo-5 | militarista | 200 | 0.0% | 0.00 | 16.4 | 1.9 |
| strategy-mercador-3 | isolacionista | 116 | 88.8% | 2.66 | 31.2 | 2 |
| strategy-mercador-3 | expansionista | 117 | 61.5% | 1.85 | 30.4 | 2 |
| strategy-mercador-3 | militarista | 120 | 20.8% | 0.63 | 27.8 | 2 |
| strategy-mercador-3 | diplomata | 131 | 0.0% | 0.00 | 24 | 1 |
| strategy-mercador-3 | mercador | 116 | 0.0% | 0.00 | 27 | 1 |
| strategy-mercador-4 | isolacionista | 153 | 70.6% | 2.82 | 29.5 | 2 |
| strategy-mercador-4 | expansionista | 162 | 45.1% | 1.80 | 28.7 | 2 |
| strategy-mercador-4 | mercador | 166 | 7.8% | 0.31 | 27.2 | 1 |
| strategy-mercador-4 | militarista | 159 | 3.8% | 0.15 | 25.4 | 2 |
| strategy-mercador-4 | diplomata | 160 | 0.0% | 0.00 | 24.3 | 1 |
| strategy-mercador-5 | mercador | 200 | 47.5% | 2.37 | 26.9 | 1 |
| strategy-mercador-5 | isolacionista | 200 | 31.0% | 1.55 | 25.1 | 1.86 |
| strategy-mercador-5 | expansionista | 200 | 21.0% | 1.05 | 24 | 1.82 |
| strategy-mercador-5 | diplomata | 200 | 0.5% | 0.02 | 24.2 | 1 |
| strategy-mercador-5 | militarista | 200 | 0.0% | 0.00 | 21.8 | 1.74 |
| strategy-tartaruga-3 | mercador | 125 | 100.0% | 3.00 | 26 | 1 |
| strategy-tartaruga-3 | isolacionista | 116 | 25.9% | 0.78 | 23.2 | 1 |
| strategy-tartaruga-3 | diplomata | 122 | 24.6% | 0.74 | 23.3 | 1 |
| strategy-tartaruga-3 | expansionista | 115 | 13.0% | 0.39 | 22.3 | 1 |
| strategy-tartaruga-3 | militarista | 122 | 0.0% | 0.00 | 19 | 1 |
| strategy-tartaruga-4 | mercador | 168 | 100.0% | 4.00 | 26.3 | 1 |
| strategy-tartaruga-4 | diplomata | 161 | 10.6% | 0.42 | 23.1 | 1 |
| strategy-tartaruga-4 | expansionista | 158 | 5.1% | 0.20 | 22.1 | 1 |
| strategy-tartaruga-4 | isolacionista | 155 | 4.5% | 0.18 | 23.1 | 1 |
| strategy-tartaruga-4 | militarista | 158 | 0.0% | 0.00 | 18.9 | 1 |
| strategy-tartaruga-5 | mercador | 200 | 79.5% | 3.97 | 26.2 | 1 |
| strategy-tartaruga-5 | isolacionista | 200 | 20.5% | 1.02 | 23.6 | 1 |
| strategy-tartaruga-5 | diplomata | 200 | 0.0% | 0.00 | 23.5 | 1 |
| strategy-tartaruga-5 | expansionista | 200 | 0.0% | 0.00 | 22.6 | 1 |
| strategy-tartaruga-5 | militarista | 200 | 0.0% | 0.00 | 19.1 | 1 |
| strategy-oportunista-3 | mercador | 118 | 100.0% | 3.00 | 31.4 | 2 |
| strategy-oportunista-3 | diplomata | 123 | 43.1% | 1.29 | 28 | 2 |
| strategy-oportunista-3 | isolacionista | 122 | 18.9% | 0.57 | 26 | 2 |
| strategy-oportunista-3 | expansionista | 120 | 5.0% | 0.15 | 25.3 | 2 |
| strategy-oportunista-3 | militarista | 117 | 0.0% | 0.00 | 25.7 | 2 |
| strategy-oportunista-4 | mercador | 149 | 79.2% | 3.17 | 28.5 | 2 |
| strategy-oportunista-4 | expansionista | 163 | 14.7% | 0.59 | 24.2 | 2.04 |
| strategy-oportunista-4 | diplomata | 156 | 14.1% | 0.56 | 23.7 | 2 |
| strategy-oportunista-4 | isolacionista | 160 | 13.1% | 0.53 | 24.2 | 1.96 |
| strategy-oportunista-4 | militarista | 172 | 8.7% | 0.35 | 23.1 | 2 |
| strategy-oportunista-5 | mercador | 200 | 100.0% | 5.00 | 24.2 | 2.04 |
| strategy-oportunista-5 | diplomata | 200 | 0.0% | 0.00 | 19.3 | 2 |
| strategy-oportunista-5 | expansionista | 200 | 0.0% | 0.00 | 19.2 | 2 |
| strategy-oportunista-5 | isolacionista | 200 | 0.0% | 0.00 | 19.2 | 2 |
| strategy-oportunista-5 | militarista | 200 | 0.0% | 0.00 | 19.5 | 1.96 |
| strategy-traidor-3 | mercador | 127 | 76.4% | 2.29 | 30.7 | 2 |
| strategy-traidor-3 | diplomata | 115 | 53.0% | 1.59 | 30.9 | 2 |
| strategy-traidor-3 | isolacionista | 119 | 31.9% | 0.96 | 30.5 | 2 |
| strategy-traidor-3 | expansionista | 123 | 3.3% | 0.10 | 29.4 | 2 |
| strategy-traidor-3 | militarista | 116 | 0.0% | 0.00 | 28.4 | 2 |
| strategy-traidor-4 | mercador | 153 | 59.5% | 2.38 | 29.7 | 2.12 |
| strategy-traidor-4 | diplomata | 160 | 40.0% | 1.60 | 29.4 | 2.24 |
| strategy-traidor-4 | isolacionista | 167 | 18.0% | 0.72 | 28.9 | 1.98 |
| strategy-traidor-4 | expansionista | 158 | 9.5% | 0.38 | 27.9 | 1.99 |
| strategy-traidor-4 | militarista | 162 | 0.0% | 0.00 | 24.6 | 1.68 |
| strategy-traidor-5 | mercador | 200 | 61.5% | 3.07 | 26.5 | 1.98 |
| strategy-traidor-5 | diplomata | 200 | 23.5% | 1.17 | 23.1 | 1.79 |
| strategy-traidor-5 | isolacionista | 200 | 8.0% | 0.40 | 22.7 | 1.85 |
| strategy-traidor-5 | expansionista | 200 | 7.0% | 0.35 | 22.3 | 1.83 |
| strategy-traidor-5 | militarista | 200 | 0.0% | 0.00 | 20.4 | 1.81 |
| strategy-passivo-3 | isolacionista | 115 | 100.0% | 3.00 | 6 | 1 |
| strategy-passivo-3 | militarista | 125 | 56.8% | 1.70 | 5 | 1 |
| strategy-passivo-3 | expansionista | 125 | 7.2% | 0.22 | 5 | 1 |
| strategy-passivo-3 | diplomata | 123 | 4.1% | 0.12 | 5 | 1 |
| strategy-passivo-3 | mercador | 112 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-4 | isolacionista | 155 | 100.0% | 4.00 | 6 | 1 |
| strategy-passivo-4 | militarista | 158 | 28.5% | 1.14 | 5 | 1 |
| strategy-passivo-4 | diplomata | 158 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-4 | expansionista | 168 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-4 | mercador | 161 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-5 | isolacionista | 200 | 100.0% | 5.00 | 6 | 1 |
| strategy-passivo-5 | diplomata | 200 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-5 | expansionista | 200 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-5 | mercador | 200 | 0.0% | 0.00 | 5 | 1 |
| strategy-passivo-5 | militarista | 200 | 0.0% | 0.00 | 5 | 1 |

## Guerra: domínio do ataque em massa (4 jogadores)

| experimento | cenário | vitória do agressivo | índice | regiões do agressivo | conquistas | ataques perdidos | eliminações/partida | acabou antes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| war-turtles-walls-chain | 1 agressivo x 3 tartarugas; com muralha; ataque encadeado (motor atual) | 40.0% | 1.60 | 2.3 | 1.3 | 0 | 0 | 0.0% |
| war-turtles-walls-nochain | 1 agressivo x 3 tartarugas; com muralha; 1 ataque por exército | 39.0% | 1.56 | 2.23 | 1.23 | 0 | 0 | 0.0% |
| war-turtles-nowalls-chain | 1 agressivo x 3 tartarugas; sem muralha; ataque encadeado (motor atual) | 26.5% | 1.06 | 2.24 | 1.24 | 0 | 0 | 0.0% |
| war-turtles-nowalls-nochain | 1 agressivo x 3 tartarugas; sem muralha; 1 ataque por exército | 18.5% | 0.74 | 2.17 | 1.17 | 0 | 0 | 0.0% |
| war-field-walls-chain | 1 agressivo x 3 sorteados (sem agressivo); com muralha; ataque encadeado (motor atual) | 6.0% | 0.24 | 2.25 | 1.27 | 0 | 0.01 | 0.0% |
| war-field-walls-nochain | 1 agressivo x 3 sorteados (sem agressivo); com muralha; 1 ataque por exército | 7.5% | 0.30 | 2.24 | 1.24 | 0 | 0 | 0.0% |
| war-field-nowalls-chain | 1 agressivo x 3 sorteados (sem agressivo); sem muralha; ataque encadeado (motor atual) | 9.0% | 0.36 | 2.27 | 1.27 | 0 | 0 | 0.0% |
| war-field-nowalls-nochain | 1 agressivo x 3 sorteados (sem agressivo); sem muralha; 1 ataque por exército | 10.5% | 0.42 | 2.26 | 1.27 | 0 | 0.01 | 0.0% |
| war-passive-walls-chain | 1 agressivo x 3 passivos; com muralha; ataque encadeado (motor atual) | 100.0% | 4.00 | 2.71 | 1.71 | 0 | 0.23 | 0.0% |
| war-passive-walls-nochain | 1 agressivo x 3 passivos; com muralha; 1 ataque por exército | 100.0% | 4.00 | 2.71 | 1.71 | 0 | 0.25 | 0.0% |
| war-passive-nowalls-chain | 1 agressivo x 3 passivos; sem muralha; ataque encadeado (motor atual) | 100.0% | 4.00 | 2.89 | 1.89 | 0 | 0.25 | 0.0% |
| war-passive-nowalls-nochain | 1 agressivo x 3 passivos; sem muralha; 1 ataque por exército | 100.0% | 4.00 | 2.83 | 1.83 | 0 | 0.26 | 0.0% |

## Manutenção linear x superlinear (só medição)

### Mistura livre, 4 jogadores, manutenção linear (regra atual)

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 663 | 49.3% | 1.97 | 27.4 | 2.02 | 18 | 16.2 | 20.2 | 8.4 | 0.0% | 97.9% | 1.8 |
| mercador | 681 | 37.6% | 1.50 | 26.3 | 1.54 | 14.2 | 13.4 | 20.1 | 6.9 | 0.0% | 56.5% | 2.4 |
| oportunista | 682 | 35.9% | 1.44 | 25.5 | 1.99 | 17.8 | 17.3 | 18.4 | 6.7 | 0.1% | 96.2% | 1.1 |
| agressivo | 674 | 19.7% | 0.79 | 22.4 | 2.3 | 18.9 | 18.5 | 15 | 6.8 | 0.0% | 100.0% | 1 |
| tartaruga | 664 | 5.9% | 0.23 | 22.3 | 1 | 9.9 | 12 | 17.2 | 4.2 | 0.2% | 0.0% | — |
| passivo | 636 | 0.0% | 0.00 | 4.9 | 0.94 | 9.7 | 3.7 | 0 | 111 | 6.3% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 3.15 | 0.01 | 0.0% | 75.3% | 26.2% | 0.1% | 31.5 | 0.14 | 1.45 | 41.6% | 62.8% |
| mercador | 3 | 0 | 0.0% | 80.7% | 28.1% | 0.0% | 33.1 | 0.13 | 1.31 | 43.3% | 68.2% |
| oportunista | 1.36 | 0 | 0.0% | 84.6% | 41.1% | 0.0% | 24.7 | 0.11 | 1.28 | 54.2% | 87.4% |
| agressivo | 0 | 0 | 0.0% | 86.0% | 64.8% | 0.0% | 15.9 | 0.42 | 0.83 | 72.7% | 124.3% |
| tartaruga | 2.13 | 0 | 0.0% | 89.5% | 48.1% | 0.0% | 20.3 | 0.07 | 1.01 | 59.9% | 107.1% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 111 | 0 | 1.55 | 27.5% | 23.3% |

### Mistura livre, 4 jogadores, manutenção superlinear cobrada pelo árbitro (só medição)

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 618 | 52.3% | 2.09 | 25.7 | 2.01 | 17.7 | 15.1 | 18.7 | 4.7 | 0.0% | 98.9% | 1.9 |
| mercador | 704 | 43.3% | 1.73 | 24.7 | 1.56 | 14.3 | 12.8 | 18.5 | 3.8 | 0.0% | 57.0% | 2.5 |
| oportunista | 675 | 30.7% | 1.23 | 22.7 | 1.98 | 17.5 | 16.3 | 15.7 | 2.8 | 0.0% | 95.0% | 1.1 |
| agressivo | 628 | 13.5% | 0.54 | 18.7 | 2.01 | 17.2 | 17.6 | 11.6 | 2.3 | 0.0% | 100.0% | 1 |
| tartaruga | 671 | 11.5% | 0.46 | 19.3 | 1 | 9.7 | 11.7 | 14.3 | 0.5 | 0.0% | 0.0% | — |
| passivo | 704 | 0.4% | 0.02 | 5.1 | 0.98 | 10.2 | 4 | 0 | 110.9 | 1.8% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 2.82 | 0.01 | 0.0% | 80.1% | 34.1% | 0.0% | 31.2 | 0.19 | 1.16 | 40.0% | 56.9% |
| mercador | 2.68 | 0 | 0.0% | 85.0% | 38.1% | 0.0% | 33.1 | 0.17 | 0.95 | 42.5% | 63.3% |
| oportunista | 1.24 | 0 | 0.0% | 88.5% | 53.9% | 0.0% | 22.8 | 0.24 | 0.85 | 53.6% | 83.3% |
| agressivo | 0 | 0 | 0.0% | 92.1% | 88.7% | 0.0% | 10.7 | 0.41 | 0.19 | 73.3% | 119.3% |
| tartaruga | 1.81 | 0 | 0.0% | 93.6% | 64.3% | 0.0% | 19.9 | 0.37 | 0.52 | 61.3% | 109.4% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 110.9 | 0 | 1.58 | 28.4% | 23.3% |

## Campanha 60 turnos, 4 bots sorteados (motor como está)

| fim da sessão (turno) | vivos | pontos | dinheiro | maior caixa | renda/turno | manutenção/turno | influência | pop | exército | regiões |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | 100.0% | 12.7 | 22.4 | 68 | 6.5 | 2.5 | 7.5 | 9.9 | 7.8 | 1.6 |
| 12 | 100.0% | 16.3 | 22.7 | 92 | 7.2 | 3.5 | 10.4 | 13.3 | 10.8 | 1.7 |
| 18 | 99.5% | 19.7 | 25.3 | 122 | 8.7 | 4.9 | 13.1 | 16.4 | 14.4 | 1.9 |
| 24 | 98.9% | 22.8 | 29.6 | 152 | 10 | 6.2 | 15.5 | 19.2 | 18.6 | 2.1 |
| 30 | 97.8% | 26.1 | 31.2 | 182 | 11.2 | 7.7 | 18.1 | 21.7 | 22.7 | 2.2 |
| 36 | 97.5% | 28.3 | 34.2 | 212 | 12 | 9.2 | 19.9 | 23.4 | 27.1 | 2.3 |
| 42 | 97.4% | 29.7 | 36.1 | 254 | 12.6 | 10.5 | 21 | 24.6 | 31.2 | 2.3 |
| 48 | 97.5% | 30.9 | 36.9 | 296 | 12.9 | 11.8 | 21.9 | 25.5 | 34.9 | 2.3 |
| 54 | 96.0% | 31.7 | 39.5 | 338 | 13.4 | 12.8 | 22.5 | 26.6 | 37.9 | 2.3 |
| 60 | 95.7% | 32.7 | 41.8 | 380 | 13.5 | 13.3 | 23.3 | 27.1 | 39.9 | 2.3 |

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 137 | 45.3% | 1.81 | 40.4 | 3.83 | 42.8 | 57.8 | 27 | 11.1 | 7.3% | 97.8% | 1.9 |
| oportunista | 135 | 33.3% | 1.33 | 37.7 | 2.91 | 33.8 | 48.2 | 26.7 | 6.7 | 4.4% | 97.8% | 1.4 |
| agressivo | 135 | 32.6% | 1.30 | 36.1 | 2.98 | 32.9 | 45.3 | 25.2 | 5.7 | 3.0% | 100.0% | 1 |
| mercador | 122 | 27.9% | 1.11 | 37.2 | 2.39 | 27.9 | 44.6 | 27.8 | 6.8 | 4.9% | 90.2% | 4.1 |
| tartaruga | 135 | 11.1% | 0.44 | 32.2 | 0.93 | 11.1 | 22.6 | 27.1 | 1.9 | 6.7% | 0.0% | — |
| passivo | 136 | 0.0% | 0.00 | 3.6 | 0.67 | 8 | 2.7 | 0 | 253.4 | 33.1% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 5.26 | 1.21 | 0.0% | 76.2% | 46.7% | 1.4% | 35.6 | 2.86 | 24.23 | 69.4% | 171.8% |
| oportunista | 1.35 | 0 | 0.0% | 85.8% | 62.4% | 0.2% | 26.9 | 3.55 | 19.64 | 83.0% | 210.1% |
| agressivo | 0 | 0 | 0.0% | 87.1% | 69.5% | 0.0% | 18.7 | 3.98 | 19.73 | 87.7% | 224.3% |
| mercador | 4.51 | 0 | 0.0% | 84.6% | 54.6% | 0.8% | 34 | 3.51 | 17.83 | 76.7% | 194.6% |
| tartaruga | 2.14 | 0 | 0.0% | 97.8% | 70.3% | 0.0% | 19.6 | 3.93 | 7.92 | 102.0% | 271.5% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 253.4 | 0 | 11.62 | 24.2% | 19.5% |

## Campanha 60 turnos, 4 bots sorteados, prévia A1 + A2

| fim da sessão (turno) | vivos | pontos | dinheiro | maior caixa | renda/turno | manutenção/turno | influência | pop | exército | regiões |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | 99.8% | 14.8 | 26.6 | 86 | 11.5 | 4.1 | 7.8 | 17.5 | 12.9 | 2.6 |
| 12 | 98.0% | 19.2 | 28.3 | 134 | 13.2 | 6.2 | 10.8 | 23 | 18.7 | 2.8 |
| 18 | 96.8% | 23.2 | 32.8 | 194 | 14.7 | 8.3 | 13.8 | 27.2 | 24.5 | 2.8 |
| 24 | 94.9% | 26.8 | 36.9 | 254 | 15.9 | 10.4 | 16.6 | 30.5 | 30.5 | 2.9 |
| 30 | 93.1% | 29.8 | 39.5 | 314 | 17.4 | 12.5 | 18.8 | 33.3 | 36.6 | 3 |
| 36 | 91.8% | 32 | 40.7 | 374 | 18.1 | 14.5 | 20.6 | 34.9 | 42.3 | 3.1 |
| 42 | 92.0% | 33 | 42.9 | 458 | 18.4 | 15.8 | 21.5 | 35.6 | 46.5 | 3.1 |
| 48 | 92.4% | 33.8 | 46.3 | 542 | 18 | 16.9 | 22.2 | 35.9 | 49.5 | 3.1 |
| 54 | 93.4% | 34.3 | 50.9 | 626 | 18.1 | 17.5 | 22.7 | 36 | 51.7 | 3 |
| 60 | 93.4% | 35.2 | 54.9 | 710 | 18 | 18 | 23.5 | 36.2 | 53.2 | 3 |

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 120 | 38.3% | 1.53 | 37.9 | 4.01 | 45.4 | 65.9 | 23.9 | 6.8 | 9.2% | 92.5% | 1.9 |
| agressivo | 139 | 37.4% | 1.50 | 39.3 | 4.26 | 48.6 | 60.3 | 24.3 | 7.3 | 6.5% | 100.0% | 1 |
| oportunista | 144 | 37.5% | 1.50 | 39.4 | 3.73 | 45.1 | 65.3 | 25.6 | 5.4 | 8.3% | 99.3% | 1.2 |
| mercador | 140 | 24.3% | 0.97 | 37.7 | 2.55 | 30.6 | 51.9 | 27.8 | 4.6 | 7.9% | 77.9% | 4.4 |
| tartaruga | 123 | 11.4% | 0.46 | 34.1 | 1.46 | 19.2 | 27.3 | 27.2 | 17.2 | 17.9% | 0.0% | — |
| passivo | 134 | 0.0% | 0.00 | 3.8 | 0.87 | 10.3 | 3.6 | 0 | 320.8 | 50.0% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| traidor | 8.22 | 4.08 | 0.0% | 71.9% | 55.0% | 3.0% | 38.9 | 3.88 | 37.09 | 72.5% | 190.0% |
| agressivo | 0 | 0 | 0.0% | 74.7% | 70.4% | 0.0% | 20.6 | 4.57 | 31.11 | 86.0% | 217.7% |
| oportunista | 2.03 | 0 | 0.0% | 79.4% | 66.2% | 1.7% | 31.5 | 4.34 | 31.25 | 83.9% | 218.1% |
| mercador | 7.21 | 0 | 0.0% | 77.9% | 49.9% | 2.3% | 42.6 | 3.83 | 26.11 | 74.5% | 198.7% |
| tartaruga | 4.79 | 0 | 0.0% | 88.1% | 48.1% | 2.7% | 39.5 | 4.13 | 16.15 | 74.8% | 175.9% |
| passivo | 0 | 0 | 100.0% | 100.0% | 0.0% | 100.0% | 320.8 | 0 | 14.99 | 25.2% | 20.3% |

## Campanha 60 turnos, só mercador e tartaruga (economia pura)

| fim da sessão (turno) | vivos | pontos | dinheiro | maior caixa | renda/turno | manutenção/turno | influência | pop | exército | regiões |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 6 | 100.0% | 14.7 | 17.3 | 40 | 6.3 | 1.9 | 9.8 | 8.8 | 6.3 | 1.3 |
| 12 | 100.0% | 19 | 12 | 37 | 6.9 | 3 | 13.4 | 11.8 | 9.5 | 1.5 |
| 18 | 100.0% | 23 | 11.3 | 46 | 8 | 4.4 | 17 | 14.1 | 13 | 1.6 |
| 24 | 100.0% | 26.7 | 13.2 | 53 | 8.8 | 5.6 | 20.1 | 16.4 | 16.7 | 1.7 |
| 30 | 100.0% | 30.2 | 10.7 | 62 | 10.6 | 7 | 23.1 | 18.6 | 20.7 | 1.9 |
| 36 | 100.0% | 32.6 | 9.6 | 76 | 11.3 | 8.8 | 25 | 20.1 | 26.1 | 2 |
| 42 | 100.0% | 34.1 | 7.8 | 70 | 11.8 | 10.5 | 26.1 | 21.6 | 31.1 | 2.1 |
| 48 | 100.0% | 35.3 | 5.9 | 58 | 11.8 | 12 | 27 | 22.8 | 35.3 | 2.1 |
| 54 | 100.0% | 35.9 | 5.2 | 49 | 12.4 | 13.1 | 27.4 | 23.8 | 38.6 | 2.1 |
| 60 | 100.0% | 36.7 | 4.1 | 49 | 12.5 | 13.8 | 28.1 | 24.5 | 40.8 | 2.1 |

| estratégia | assentos | vitória | índice | pontos | regiões | pop | exército | influência | dinheiro final | eliminado | conquistou | 1ª conquista (turno) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 410 | 42.7% | 1.71 | 40.5 | 3.1 | 36.3 | 56.6 | 28.8 | 6.3 | 0.0% | 91.0% | 4.3 |
| tartaruga | 390 | 6.4% | 0.26 | 32.7 | 1 | 12.1 | 24.1 | 27.3 | 1.8 | 0.0% | 0.0% | — |

| estratégia | tratados firmados/partida | quebrados/partida | dilemas ignorados | turnos sem ação | turnos com caixa < 10 | turnos com caixa > 50 | pico de caixa | desertores/partida | fome (pop)/partida | manutenção ÷ renda | superlinear ÷ renda |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mercador | 5.35 | 0 | 0.0% | 78.7% | 47.9% | 0.9% | 36.6 | 2.72 | 20.06 | 70.8% | 182.2% |
| tartaruga | 3.03 | 0 | 0.0% | 97.6% | 68.0% | 0.0% | 21.2 | 3.96 | 8.21 | 99.0% | 262.5% |

