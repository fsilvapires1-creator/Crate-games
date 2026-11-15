# Simulador de bots — relatório (motor e56251f)

Data: 2026-11-15. Sala: Fable. Fonte: `tools/sim` na branch `ccr-a759ed9c-2b4eyy` do repo Crate-games.
Motor testado: commit `e56251f` da sala de Código (73 testes passam; correções A1 e A2 já no motor).
Comparação: commit `a855d7b` (antes das correções), em `out/a855d7b/`.

## Como foi medido

- 16.600 partidas no motor e56251f (46 experimentos) e 20.600 no a855d7b (56 experimentos). Sementes fixas; duas execuções dão resultado idêntico (`npm run check`).
- Os bots usam só `applyAction`, `chooseDilemma` e `endTurn` do motor real. Nenhum arquivo de `src/` foi copiado nem alterado.
- 6 estratégias: agressivo (massa), mercador (tratados, troca por influência, toma neutros seguros), tartaruga (muralhas, não ataca), oportunista (ataca o mais fraco com margem), traidor (assina e quebra quando a conquista vale mais que a multa), passivo (não age, ignora dilemas).
- `índice` = taxa de vitória ÷ fatia justa (1 ÷ jogadores). 1,00 = equilibrado.
- Limite: bots são heurísticas, não jogadores ótimos. Os números valem para comparar regras e traços entre si, não como previsão exata de mesa humana.

## Os 5 maiores problemas de balanceamento

### 1. A economia é apertada demais: quase ninguém consegue agir
- 61% a 73% das vezes de jogador terminam sem nenhuma ação (bots ativos). Média de 0,34 a 0,38 ação por vez, de 3 possíveis.
- 28% (5 jog.) a 48% (3 jog.) das rodadas inteiras passam sem ação de ninguém.
- Causa: cidade inicial rende 3 por turno; recrutar custa 10, muralha 15, conquista 20, edifício e fazenda 30. O limite de 3 ações e a 4ª ação nunca chegam a importar.
- Edifício (30 por +1 de renda) leva 30 turnos para se pagar: nunca compensa em 20 turnos. Bots construíram 0,008 por vez; fazenda: 0.

### 2. Trocar dinheiro por influência decide a partida
- Influência final: 16 a 24 pontos, de 26 a 32 no total (cerca de 70% da pontuação). Capital vale 3 e população cerca de 5.
- A estratégia mercador (troca e tratados) tem índice 1,40 / 1,66 / 1,62 com 3 / 4 / 5 jogadores e ganha com qualquer traço (T4: 1,77 a 2,21).
- O passivo termina com 145 moedas e 5 pontos: dinheiro parado vale zero, e ignorar dilemas zera a influência (−1 por turno).

### 3. Traços desiguais: Mercador forte, Militarista fraco
- Mercador: índice 1,44 / 1,49 / 1,91. Militarista: 0,59 / 0,48 / 0,27 (3 / 4 / 5 jogadores).
- +1 de renda por cidade em economia de 3 por cidade é +33%. A manutenção extra do Militarista (floor(exército/4)) tira cerca de 2 a 3 por turno da mesma economia.
- Pior par: tartaruga + militarista (0,09). Melhor: agressivo + mercador (2,41).

### 4. Combate sem risco e avanço cedo: quem lidera no turno 10 vence
- Líder no turno 10 vence 69% a 74% das partidas.
- Batalha é determinística: os bots nunca perderam um ataque (0 em todas as partidas), porque dá para calcular o resultado antes.
- Neutro tem exército 2 contra 4 inicial: o agressivo conquista no turno 1 em 100% das partidas.
- Contra 3 passivos o agressivo vence 100%, com 1,2 eliminação por partida e 20% das partidas acabando antes do turno 20.
- Ataque em massa NÃO domina a mesa mista depois das correções: agressivo 1,41 / 1,29 / 1,33; perde para mercador com 4 e 5 jogadores.

### 5. Defesa e crescimento não compensam: muralha é armadilha, população trava em 10
- Tartaruga: índice 0,66 / 0,52 / 0,74. Contra 1 agressivo, 3 tartarugas COM muralha deixam o agressivo vencer 34%; SEM muralha, só 8%. Cada muralha custa 15 (1,5 ponto de influência) e ninguém ataca a região murada.
- População: sem fazenda a cidade passa fome ao chegar a 11 (produz 5, consome 6). Perda por fome: 2 a 3 de pop por país em 20 turnos; 26 a 35 em 60 turnos. O teto 20 nunca é alcançado.

## Campanha de 60 turnos (10 sessões de 6)
- Sem inflação para quem joga: caixa médio 27 → 58. Só o passivo acumula (308 em média, máximo 710).
- Estagnação a partir do turno 30 a 36: pontuação 31,4 (T36) → 35,0 (T60); na mesa pacífica 39,4 → 41,0.
- Influência bate no teto 30 perto do turno 30 na mesa pacífica; depois disso o dinheiro não tem mais uso.
- Manutenção alcança a renda: renda 17,9 e manutenção 17,3 no turno 60 (exército médio 51). A economia aguenta, mas trava.
- População: 36 por país com 3 regiões, cerca de 12 por região. Não chega a 20.
- 0,71 eliminação por partida; 15,5% das campanhas acabam antes do turno 60.

## Guerra
- Regra de 1 ataque por exército (A2): efeito pequeno na vitória do agressivo (motor antigo: 1,60 com encadeamento, 1,56 sem). O limite real é o dinheiro: 20 por conquista.
- Manutenção linear consome 40% a 64% da renda. A proposta superlinear (floor(n/3) + max(0, n−6)) consumiria 64% a 120%.
- Com a superlinear cobrada: agressivo 1,33 → 0,98; tartaruga 0,45 → 0,87; Militarista 0,43 → 0,91. Mas as vezes sem ação sobem (68% → 80%). Só medição; a regra não mudou.

## Sugestões para `src/data/rules.json` (valores, não código)

| chave | hoje | sugestão | motivo |
|---|---|---|---|
| economy.incomePopDivisor | 2 | 1 | dobra a renda (cidade inicial 6); ataca o problema 1 |
| costs.building | 30 | 15 | paga em 15 turnos em vez de 30 |
| costs.farm | 30 | 15 | destrava a população acima de 10 |
| costs.wall | 15 | 10 | muralha deixa de custar mais do que protege |
| effects.wallDefense | 3 | 5 | 1 muralha = +50% de força do defensor |
| costs.influenceTrade | 10 | 15 | reduz o peso da troca (problema 2); subir junto com a renda |
| caps.influence | 30 | 20 | evita que influência seja 70% da pontuação |
| score.ownCapital | 3 | 5 | território passa a pesar |
| score.popDivisor | 4 | 3 | população passa a pesar |
| neutral.army | 2 | 4 | acaba a conquista grátis no turno 1 (empate é do defensor) |
| traits.militarista.extraUpkeepArmyDivisor | 4 | 8 | metade da manutenção extra |
| traits.mercador.startArmyPerRegion | 3 | 2 | custo real para o +1 de renda |
| traits.mercador.startInfluenceDelta | (não existe) | −1 | idem; o setup já lê essa chave para qualquer traço |

Mudar um grupo por vez e rodar de novo: `tools/sim/run.sh <commit>` leva cerca de 3 minutos.
Combate determinístico e dilema sempre resolvido (0% ignorados por bots ativos) são decisões de regra, não de valor: ficam para a Coordenação.

## Tabelas

### T1. Partidas (motor e56251f)

| experimento | partidas | líder T10 vence | eliminações/partida | acabou antes | rodadas sem ação | ações por vez | impasse |
|---|---|---|---|---|---|---|---|
| mix-3 | 1000 | 74% | 0.11 | 1% | 48% | 0.34 | 0% |
| mix-4 | 1000 | 71% | 0.21 | 0% | 34% | 0.38 | 0% |
| mix-5 | 1000 | 69% | 0.25 | 0% | 28% | 0.35 | 0% |
| upkeep-linear | 1000 | 72% | 0.2 | 0% | 34% | 0.38 | 0% |
| upkeep-superlinear | 1000 | 72% | 0.13 | 0% | 53% | 0.26 | 0% |
| campaign-mix | 200 | 63% | 0.71 | 16% | 48% | 0.26 | 0% |
| campaign-peace | 200 | 36% | 0 | 0% | 37% | 0.34 | 0% |

### T2.3 Estratégia, 3 jogadores (1000 partidas)

| estratégia | vitória | índice | pontos | regiões | pop | exército | influência | caixa final | eliminado | 1ª conquista | tratados | quebras | vez sem ação | caixa<10 | dilema ignorado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| agressivo | 47% | 1.41 | 26.4 | 3.3 | 30.6 | 28.5 | 16 | 9.6 | 0% | 1 | 0 | 0 | 67% | 58% | 0% |
| mercador | 46% | 1.4 | 31.1 | 2.05 | 20.5 | 18.9 | 23.3 | 11.3 | 1% | 3 | 3.06 | 0 | 68% | 23% | 0% |
| traidor | 46% | 1.38 | 29.6 | 2.94 | 28.3 | 28.3 | 19.7 | 10.4 | 0% | 2 | 2.88 | 0.34 | 66% | 27% | 0% |
| oportunista | 40% | 1.19 | 27.8 | 2.83 | 27 | 28.5 | 18.4 | 8.4 | 1% | 1.8 | 1.39 | 0 | 74% | 41% | 0% |
| tartaruga | 22% | 0.66 | 27.6 | 1.8 | 18.7 | 17.1 | 20.2 | 8.1 | 1% | — | 2.6 | 0 | 75% | 27% | 0% |
| passivo | 0% | 0.01 | 6 | 1.47 | 15.4 | 5.9 | 0 | 153.3 | 19% | — | 0 | 0 | 100% | 0% | 100% |

### T2.4 Estratégia, 4 jogadores (1000 partidas)

| estratégia | vitória | índice | pontos | regiões | pop | exército | influência | caixa final | eliminado | 1ª conquista | tratados | quebras | vez sem ação | caixa<10 | dilema ignorado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mercador | 42% | 1.66 | 31.9 | 2.18 | 21.4 | 19.1 | 24 | 14.1 | 1% | 2.6 | 4.11 | 0 | 65% | 19% | 0% |
| traidor | 36% | 1.43 | 30 | 2.99 | 28.6 | 28 | 20.1 | 12.2 | 2% | 2.1 | 4.1 | 0.56 | 61% | 21% | 0% |
| agressivo | 32% | 1.29 | 26.5 | 3.44 | 31.6 | 30 | 15.8 | 9.9 | 1% | 1 | 0 | 0 | 68% | 59% | 0% |
| oportunista | 27% | 1.08 | 27.5 | 2.86 | 27 | 28.3 | 18.1 | 9.2 | 1% | 1.6 | 1.67 | 0 | 73% | 42% | 0% |
| tartaruga | 13% | 0.52 | 27.9 | 1.84 | 18.9 | 17.2 | 20.4 | 9.2 | 1% | — | 3.62 | 0 | 72% | 22% | 0% |
| passivo | 0% | 0 | 5.4 | 1.31 | 13.6 | 5.2 | 0 | 145.2 | 26% | — | 0 | 0 | 100% | 0% | 100% |

### T2.5 Estratégia, 5 jogadores (1000 partidas)

| estratégia | vitória | índice | pontos | regiões | pop | exército | influência | caixa final | eliminado | 1ª conquista | tratados | quebras | vez sem ação | caixa<10 | dilema ignorado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mercador | 32% | 1.62 | 28.9 | 2.01 | 20 | 22.4 | 21.5 | 9.5 | 1% | 2 | 3.82 | 0 | 69% | 28% | 0% |
| agressivo | 26% | 1.33 | 25.1 | 2.98 | 28.8 | 31.4 | 15 | 7.9 | 2% | 1 | 0 | 0 | 70% | 64% | 0% |
| traidor | 27% | 1.33 | 27.3 | 2.84 | 27.4 | 29.9 | 17.8 | 10.7 | 2% | 2.5 | 3.66 | 0.46 | 64% | 34% | 0% |
| oportunista | 20% | 0.99 | 24.2 | 2.62 | 24.6 | 29.6 | 15.8 | 7 | 1% | 1.6 | 1.42 | 0 | 73% | 57% | 0% |
| tartaruga | 15% | 0.74 | 26.7 | 1.78 | 18.2 | 18.1 | 19.7 | 8.5 | 2% | — | 3.59 | 0 | 72% | 27% | 0% |
| passivo | 0% | 0 | 5.3 | 1.3 | 13.5 | 5.2 | 0.1 | 142.1 | 23% | — | 0 | 0 | 100% | 0% | 100% |

### T3. Traço: índice de vitória (1,00 = justo)

| traço | 3 jog. | 4 jog. | 5 jog. | pontos (4 jog.) | influência (4 jog.) |
|---|---|---|---|---|---|
| mercador | 1.44 | 1.49 | 1.91 | 27.2 | 18.5 |
| isolacionista | 1.05 | 1.23 | 1.17 | 26.3 | 17 |
| expansionista | 1.02 | 0.96 | 0.85 | 25.1 | 16.7 |
| diplomata | 0.94 | 0.84 | 0.78 | 24.7 | 16.8 |
| militarista | 0.59 | 0.48 | 0.27 | 21.6 | 13.7 |

### T4. Traço fixo: índice por estratégia (4 jogadores, 200 partidas cada)

| todos com o traço | agressivo | mercador | tartaruga | oportunista | traidor | passivo |
|---|---|---|---|---|---|---|
| mercador | 1.53 | 1.77 | 0.56 | 0.97 | 1.17 | 0 |
| isolacionista | 1.06 | 2.21 | 0.28 | 1.26 | 1.33 | 0 |
| expansionista | 0.83 | 1.97 | 0.49 | 0.73 | 1.78 | 0 |
| diplomata | 1.33 | 1.85 | 0.47 | 0.91 | 1.53 | 0 |
| militarista | 0.91 | 2.05 | 0.55 | 0.9 | 1.59 | 0 |

### T5. Estratégia fixa: índice por traço (4 jogadores, 200 partidas cada)

| todos com a estratégia | mercador | isolacionista | expansionista | diplomata | militarista |
|---|---|---|---|---|---|
| agressivo | 1.8 | 0.39 | 0.68 | 1.26 | 0.97 |
| mercador | 0.51 | 2.93 | 0.42 | 0 | 1.26 |
| tartaruga | 4 | 0.59 | 0.03 | 0.2 | 0 |
| oportunista | 2.58 | 1.1 | 0.93 | 0.56 | 0 |
| traidor | 1.46 | 0.69 | 0.76 | 1.33 | 0.79 |
| passivo | 0 | 4 | 0 | 0 | 1.14 |

### T6. Pares estratégia + traço, 4 jogadores: 6 melhores e 6 piores (sem passivo)

| par | assentos | vitória | índice | pontos |
|---|---|---|---|---|
| agressivo + mercador | 126 | 60% | 2.41 | 33.4 |
| mercador + isolacionista | 137 | 57% | 2.28 | 34.8 |
| oportunista + mercador | 125 | 50% | 2.02 | 31.7 |
| mercador + mercador | 118 | 48% | 1.9 | 34.2 |
| traidor + mercador | 141 | 48% | 1.9 | 31.9 |
| traidor + isolacionista | 130 | 45% | 1.82 | 31.8 |
| tartaruga + isolacionista | 148 | 13% | 0.51 | 29.2 |
| tartaruga + expansionista | 131 | 12% | 0.49 | 27.6 |
| tartaruga + diplomata | 138 | 12% | 0.46 | 28.2 |
| agressivo + militarista | 139 | 11% | 0.43 | 21.4 |
| oportunista + militarista | 143 | 7% | 0.28 | 22.2 |
| tartaruga + militarista | 132 | 2% | 0.09 | 22.5 |

### T7. Ações por vez de jogador, 4 jogadores

| estratégia | treaty | breakTreaty | tradeInfluence | recruit | wall | move | building | attack | farm |
|---|---|---|---|---|---|---|---|---|---|
| mercador | 0.122 | 0 | 0.272 | 0.059 | 0 | 0 | 0.008 | 0.02 | 0 |
| traidor | 0.132 | 0.028 | 0.168 | 0.189 | 0 | 0 | 0 | 0.064 | 0 |
| agressivo | 0 | 0 | 0.048 | 0.247 | 0 | 0.057 | 0 | 0.093 | 0 |
| oportunista | 0 | 0 | 0.11 | 0.206 | 0 | 0 | 0 | 0.066 | 0 |
| tartaruga | 0.084 | 0 | 0.115 | 0.027 | 0.139 | 0 | 0 | 0 | 0 |
| passivo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### T8. Guerra: 1 agressivo contra 3 (4 jogadores, 200 partidas cada)

| motor | cenário | vitória do agressivo | índice | regiões | conquistas | ataques perdidos | eliminações/partida |
|---|---|---|---|---|---|---|---|
| e56251f | turtles-walls-nochain | 34% | 1.38 | 3.64 | 1.64 | 0 | 0 |
| e56251f | turtles-nowalls-nochain | 8% | 0.3 | 3.37 | 1.37 | 0 | 0.01 |
| e56251f | field-walls-nochain | 20% | 0.82 | 3 | 1.46 | 0 | 0.01 |
| e56251f | field-nowalls-nochain | 15% | 0.6 | 3.14 | 1.5 | 0 | 0.02 |
| e56251f | passive-walls-nochain | 100% | 4 | 6.9 | 4.89 | 0 | 1.23 |
| e56251f | passive-nowalls-nochain | 100% | 4 | 6.81 | 4.81 | 0 | 1.21 |
| a855d7b | turtles-walls-chain | 40% | 1.6 | 2.3 | 1.3 | 0 | 0 |
| a855d7b | turtles-walls-nochain | 39% | 1.56 | 2.23 | 1.23 | 0 | 0 |
| a855d7b | turtles-nowalls-chain | 26% | 1.06 | 2.24 | 1.24 | 0 | 0 |
| a855d7b | turtles-nowalls-nochain | 18% | 0.74 | 2.17 | 1.17 | 0 | 0 |
| a855d7b | field-walls-chain | 6% | 0.24 | 2.25 | 1.27 | 0 | 0.01 |
| a855d7b | field-walls-nochain | 8% | 0.3 | 2.24 | 1.24 | 0 | 0 |
| a855d7b | field-nowalls-chain | 9% | 0.36 | 2.27 | 1.27 | 0 | 0 |
| a855d7b | field-nowalls-nochain | 10% | 0.42 | 2.26 | 1.27 | 0 | 0.01 |
| a855d7b | passive-walls-chain | 100% | 4 | 2.71 | 1.71 | 0 | 0.23 |
| a855d7b | passive-walls-nochain | 100% | 4 | 2.71 | 1.71 | 0 | 0.25 |
| a855d7b | passive-nowalls-chain | 100% | 4 | 2.89 | 1.89 | 0 | 0.25 |
| a855d7b | passive-nowalls-nochain | 100% | 4 | 2.83 | 1.83 | 0 | 0.26 |

### T9. Manutenção: linear (regra) x superlinear cobrada pelo árbitro (4 jogadores, 1000 partidas)

| estratégia | índice linear | índice superlinear | exército linear | exército superlinear | manutenção÷renda (linear) | superlinear÷renda (medida) | vez sem ação lin. | vez sem ação sup. |
|---|---|---|---|---|---|---|---|---|
| mercador | 1.73 | 1.8 | 19 | 19.1 | 40% | 64% | 64% | 73% |
| traidor | 1.35 | 1.41 | 28.5 | 25 | 44% | 79% | 61% | 74% |
| agressivo | 1.33 | 0.98 | 29.7 | 25.3 | 64% | 120% | 68% | 80% |
| oportunista | 1.08 | 0.97 | 28.4 | 24.8 | 58% | 106% | 73% | 83% |
| tartaruga | 0.45 | 0.87 | 17.2 | 17.2 | 44% | 70% | 73% | 82% |
| passivo | 0 | 0.02 | 5.2 | 6.2 | 28% | 24% | 100% | 100% |

| traço | índice linear | índice superlinear |
|---|---|---|
| mercador | 1.57 | 1.33 |
| isolacionista | 1.23 | 1.05 |
| diplomata | 0.9 | 0.83 |
| expansionista | 0.89 | 0.89 |
| militarista | 0.43 | 0.91 |

### T10. Campanha 60 turnos, 4 bots, bots sorteados (200 partidas; médias por país vivo)

| turno | vivos | pontos | caixa | maior caixa | renda | manutenção | influência | pop | exército | regiões |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 100% | 14.4 | 27.2 | 86 | 11 | 4.1 | 7.6 | 16.7 | 12.7 | 2.4 |
| 12 | 98% | 18.8 | 28.7 | 134 | 12.8 | 5.8 | 10.7 | 22.1 | 17.9 | 2.6 |
| 18 | 96% | 22.9 | 33.1 | 194 | 14.5 | 7.9 | 13.7 | 26.4 | 23.3 | 2.8 |
| 24 | 94% | 26.4 | 36.1 | 254 | 15.4 | 9.8 | 16.5 | 29.6 | 29.2 | 2.9 |
| 30 | 92% | 29.6 | 38.8 | 314 | 17.1 | 11.8 | 18.9 | 32.3 | 34.9 | 2.9 |
| 36 | 93% | 31.4 | 40.1 | 374 | 17.3 | 13.6 | 20.5 | 33.2 | 40 | 2.9 |
| 42 | 93% | 32.6 | 42.4 | 458 | 17.7 | 14.9 | 21.4 | 34.3 | 44.1 | 3 |
| 48 | 92% | 33.5 | 47.5 | 542 | 17.7 | 16 | 22.1 | 35.1 | 47.5 | 3 |
| 54 | 92% | 34.1 | 52.9 | 626 | 18.1 | 16.8 | 22.6 | 35.8 | 50.1 | 3 |
| 60 | 93% | 35 | 58.5 | 710 | 17.9 | 17.3 | 23.4 | 35.9 | 51.5 | 3 |

| estratégia | índice | pontos | caixa final | pico de caixa | eliminado | fome (pop perdida) | desertores |
|---|---|---|---|---|---|---|---|
| traidor | 1.64 | 38.1 | 9.1 | 41.5 | 11% | 34.94 | 3.91 |
| oportunista | 1.36 | 38.7 | 6.4 | 32.2 | 10% | 28.82 | 4.36 |
| agressivo | 1.3 | 38.1 | 7.6 | 21 | 8% | 28.19 | 4.6 |
| mercador | 1.18 | 36.9 | 5 | 41.4 | 11% | 25.56 | 4.22 |
| tartaruga | 0.53 | 35.2 | 31 | 52.2 | 14% | 15.61 | 2.98 |
| passivo | 0 | 3.6 | 308.2 | 308.2 | 52% | 13.96 | 0 |

### T10. Campanha 60 turnos, 4 bots, só mercador e tartaruga (200 partidas; médias por país vivo)

| turno | vivos | pontos | caixa | maior caixa | renda | manutenção | influência | pop | exército | regiões |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 100% | 16.9 | 28.8 | 49 | 13.1 | 3.2 | 10.1 | 16.5 | 10.2 | 2.2 |
| 12 | 100% | 23 | 31.1 | 55 | 15.3 | 4.1 | 15.1 | 21.4 | 13 | 2.4 |
| 18 | 100% | 30 | 29.5 | 55 | 16.5 | 5.5 | 21.2 | 24.6 | 16.4 | 2.5 |
| 24 | 100% | 35.6 | 33.1 | 56 | 14.8 | 7.8 | 26.2 | 27.1 | 23.3 | 2.6 |
| 30 | 100% | 38.5 | 28.1 | 60 | 19.5 | 10.9 | 28.4 | 29.5 | 31.7 | 2.7 |
| 36 | 100% | 39.4 | 21.7 | 64 | 19.6 | 13.5 | 29.1 | 31.1 | 39.1 | 2.7 |
| 42 | 100% | 39.9 | 18.4 | 96 | 19.5 | 15.4 | 29.1 | 32.6 | 45 | 2.7 |
| 48 | 100% | 40.5 | 26.3 | 158 | 18.3 | 16.7 | 29.3 | 33.9 | 48.7 | 2.7 |
| 54 | 100% | 40.8 | 27.6 | 197 | 19.9 | 17.6 | 29.4 | 34.9 | 51.7 | 2.7 |
| 60 | 100% | 41 | 29.7 | 246 | 19.3 | 18.4 | 29.5 | 35.5 | 53.9 | 2.7 |

| estratégia | índice | pontos | caixa final | pico de caixa | eliminado | fome (pop perdida) | desertores |
|---|---|---|---|---|---|---|---|
| mercador | 1.51 | 42.7 | 6.9 | 52 | 0% | 33.1 | 3.98 |
| tartaruga | 0.46 | 39.3 | 53.6 | 76.3 | 0% | 17.26 | 3.31 |

### T11. Antes e depois das correções A1 e A2 (4 jogadores, mistura livre)

| estratégia | índice a855d7b | índice e56251f | regiões antes | regiões depois | vez sem ação antes | depois |
|---|---|---|---|---|---|---|
| mercador | 1.48 | 1.66 | 1.56 | 2.18 | 80% | 65% |
| traidor | 2 | 1.43 | 2 | 2.99 | 75% | 61% |
| agressivo | 0.8 | 1.29 | 2.32 | 3.44 | 86% | 68% |
| oportunista | 1.37 | 1.08 | 1.99 | 2.86 | 84% | 73% |
| tartaruga | 0.33 | 0.52 | 1 | 1.84 | 90% | 72% |
| passivo | 0 | 0 | 0.93 | 1.31 | 100% | 100% |

Tabelas completas (todas as combinações): `tools/sim/out/e56251f/tables.md` e `tools/sim/out/a855d7b/tables.md`.
