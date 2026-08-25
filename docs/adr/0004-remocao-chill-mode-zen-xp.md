# ADR-0004: Remoção do Chill Mode / Zen XP em favor de um sistema único de Gains XP

## Status
Aceito

## Contexto
A concepção inicial do projeto previa duas trilhas paralelas de XP: Gains XP
(treino, Beast Mode) e Zen XP (descanso e hidratação, Chill Mode), com um
sistema de debuffs de fadiga penalizando o usuário que treinasse sem
respeitar dias de descanso. Ao revisar o escopo do MVP, essa dualidade se
mostrou mais complexa do que o necessário para a primeira entrega, tanto em
termos de lógica de backend quanto de comunicação da mecânica ao usuário.

## Decisão
Remover o Chill Mode, o Zen XP e o sistema de debuffs de fadiga. O
aplicativo passa a ter uma única fonte principal de progressão, o **Gains
XP**, vinda do registro de treinos. A hidratação deixa de ser uma trilha
paralela e passa a ser um **bônus opcional** dentro do próprio sistema de
Gains XP (ver ADR-0005).

## Alternativas Consideradas
- **Manter as duas trilhas de XP (Gains + Zen)** — mais fiel à ideia
  original de balancear esforço e recuperação, mas aumenta a complexidade de
  implementação e de UX no MVP, sem validação prévia de que os usuários
  entenderiam a mecânica dupla.
- **Manter debuff de fadiga sem a trilha de Zen XP** — descartado por
  introduzir punição sem uma contrapartida clara de recompensa, o que vai
  contra a diretriz de retenção do produto (evitar frustrar o usuário).

## Consequências
- Sistema de XP mais simples de implementar e explicar ao usuário no MVP.
- Reduz o escopo de telas e lógica de backend do Trimestre 3.
- O conceito de "Beast & Chill" original fica registrado apenas como
  referência histórica; qualquer reintrodução de mecânicas de descanso ou
  penalidade deve ser tratada como uma nova decisão (novo ADR).
- A retenção via variedade de mecânicas passa a depender mais de features
  futuras (Feed Social, Leaderboard) do que da complexidade do sistema de XP.
