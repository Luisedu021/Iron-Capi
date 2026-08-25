# ADR-0007: Padronização de código com ESLint, Prettier e Husky

## Status
Aceito

## Contexto
Com 4 desenvolvedores trabalhando simultaneamente no mesmo código-base
(React Native/Expo), divergências de formatação e estilo de código geram
diffs desnecessários, dificultam revisão de Pull Requests e aumentam o
risco de bugs por inconsistência. É necessário padronizar o código
automaticamente antes de cada commit, sem depender de disciplina manual
de cada membro do squad.

## Decisão
Adotar **ESLint** para lint (análise estática e regras de qualidade) e
**Prettier** para formatação automática de código, integrados via
**Husky** com **lint-staged**, rodando lint/format automaticamente nos
arquivos alterados a cada commit (pre-commit hook).

## Alternativas Consideradas
- **Sem ferramenta de padronização, apenas revisão manual em PR** —
  descartado por sobrecarregar a revisão de código com comentários de
  estilo, em vez de focar em lógica e arquitetura.
- **Rodar lint/format apenas manualmente ou via CI, sem hook local** —
  permitiria commits com código fora do padrão, adiando a correção e
  poluindo o histórico do Git com commits de "fix lint" separados.

## Consequências
- Código consistente entre os 4 membros do squad, reduzindo atrito em
  revisões de Pull Request.
- Erros de lint são pegos antes do commit, não depois, reduzindo retrabalho.
- Adiciona uma dependência de setup local (Husky precisa ser instalado e
  configurado corretamente na máquina de cada desenvolvedor) e um pequeno
  overhead a cada commit.
