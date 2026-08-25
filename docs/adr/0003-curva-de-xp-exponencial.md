# ADR-0003: Curva de progressão de XP exponencial suave

## Status
Aceito

## Contexto
O sistema de gamificação (issue #24) precisa definir como o XP acumulado se
traduz em níveis da Capivara. A curva de progressão afeta diretamente a
retenção do usuário: progressão rápida demais banaliza o avanço; progressão
lenta demais desmotiva o usuário nas primeiras semanas, quando o risco de
abandono (churn) é maior.

## Decisão
Adotar uma curva exponencial suave para o XP necessário por nível:

```
XP_necessário(nível) = Base × (nível ^ Expoente)
```

Com **Base = 100** e **Expoente = 1.5**, fazendo os primeiros níveis subirem
rapidamente (engajamento inicial) e os níveis avançados exigirem mais XP
(retenção de longo prazo).

## Alternativas Consideradas
- **Curva linear** (`XP_necessário = Base × nível`) — mais simples de
  implementar, mas gera progressão constante que não recompensa o esforço
  crescente do jogador em níveis avançados, resultando em avanço
  previsível e menos motivador.
- **Curva exponencial agressiva** (Expoente > 2) — aumentaria a retenção em
  longo prazo, mas arrisca frustrar novos usuários com uma progressão inicial
  lenta demais, prejudicando o onboarding.

## Consequências
- Progressão inicial rápida ajuda a reter usuários nas primeiras semanas de uso.
- Nos níveis mais altos, o custo de XP cresce de forma sustentável sem exigir
  um balanceamento manual por nível.
- O expoente é um parâmetro ajustável: caso testes de usabilidade (Trimestre 4)
  mostrem que a curva está rápida ou lenta demais, o valor pode ser recalibrado
  sem alterar a arquitetura da fórmula.
