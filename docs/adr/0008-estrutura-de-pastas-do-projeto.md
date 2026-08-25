# ADR-0008: Organização das pastas do projeto em `src`, `ativos` e `roteiros`

## Status
Aceito

## Contexto
Com o projeto iniciado via Expo e múltiplos desenvolvedores trabalhando em
telas, lógica de negócio e assets ao mesmo tempo, é necessário definir uma
estrutura de pastas clara na raiz do repositório para evitar confusão sobre
onde cada tipo de arquivo deve ficar.

## Decisão
Organizar a raiz do repositório com pastas dedicadas por tipo de conteúdo:
- **`src/`** — código-fonte da aplicação (telas, componentes, lógica);
- **`ativos/`** — assets do projeto (imagens, ícones, sprites da Capivara,
  cosméticos);
- **`roteiros/`** — roteiros e scripts (ex: script de apresentação,
  roteiros de vídeo de checkpoints acadêmicos).

Arquivos de configuração de ambiente (`.vscode`, `.husky`, `.gitignore`,
`.prettierrc`, `eslint.config.js`, `app.json`) ficam na raiz do projeto,
fora dessas pastas.

## Alternativas Consideradas
- **Estrutura padrão gerada pelo Expo, sem reorganização** — mais rápida de
  manter no início, mas tende a misturar código, assets e documentação
  conforme o projeto cresce, dificultando a navegação para novos membros do
  squad.
- **Nomes em inglês (`src`, `assets`, `scripts`)** — mais alinhado a
  convenções internacionais de mercado, mas o time optou por manter parte
  da nomenclatura em português (`ativos`, `roteiros`) para refletir a
  identidade do projeto.

## Consequências
- Fica mais fácil para qualquer membro do squad localizar onde adicionar ou
  encontrar um arquivo, independente da frente em que atua.
- Mistura de convenções (pastas em português, código e configs em inglês)
  exige alinhamento do time para não gerar inconsistência ao criar novas
  pastas no futuro.
