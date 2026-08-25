# ADR-0006: Evolução visual da Capivara em estágios fixos por faixa de nível

## Status
Aceito

## Contexto
A Capivara precisa mudar de aparência conforme o usuário evolui, para dar
sensação de progresso no Dashboard. Criar uma arte exclusiva para cada nível
individual demandaria um volume de trabalho de design incompatível com a
capacidade de um único UI/UX & Game Designer no squad, dentro do prazo do
MVP.

## Decisão
A evolução visual da Capivara será feita em **5 estágios fixos**, atrelados a
faixas de nível: Filhote (1–4), Jovem (5–9), Adulta (10–14), Avançada
(15–19) e Máxima (20+).

## Alternativas Consideradas
- **Arte única por nível individual** — daria uma sensação de progresso mais
  granular, mas inviável para o volume de assets necessário com a equipe de
  design disponível.
- **Evolução puramente numérica (sem mudança visual), só barra de progresso** —
  mais simples de implementar, mas reduz o apelo visual e o senso de conquista
  central à proposta de gamificação do produto.

## Consequências
- Volume de assets de design previsível e viável para um único
  UI/UX & Game Designer entregar dentro do cronograma do MVP.
- Sensação de progresso perceptível em marcos claros, mesmo sem arte por nível.
- Caso o time queira granularidade maior no futuro (ex: variações estéticas
  dentro de um mesmo estágio), isso pode ser tratado como uma extensão, sem
  contradizer esta decisão.
