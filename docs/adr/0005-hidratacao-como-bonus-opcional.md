# ADR-0005: Hidratação como bônus opcional de XP, sem obrigatoriedade

## Status
Aceito

## Contexto
Após a remoção do Chill Mode (ADR-0004), era preciso decidir o que fazer com
o registro de hidratação (Tereré/Água), que fazia parte da proposta original
do produto como elemento de identidade regional e incentivo a hábitos
saudáveis.

## Decisão
O registro de hidratação passa a ser **opcional e desacoplado do treino**.
Caso o usuário atinja sua meta diária de consumo (calculada de acordo com seu
perfil), ele recebe um bônus fixo de XP (`+25 XP` por dia), somado ao
Gains XP total. Não há penalidade caso a meta não seja atingida.

## Alternativas Consideradas
- **Remover completamente a hidratação do MVP** — simplificaria ainda mais o
  escopo, mas descartaria um elemento de identidade do produto (Tereré) que é
  também um diferencial cultural regional citado na justificativa do projeto.
- **Tornar a hidratação obrigatória, com penalidade por não atingir a meta** —
  descartado por reintroduzir a lógica de punição que a ADR-0004 removeu.

## Consequências
- Mantém o elemento de identidade regional (Tereré/hidratação) sem reintroduzir
  a complexidade de uma trilha paralela de XP.
- Reforça hábitos saudáveis de forma positiva, sem risco de frustrar o usuário.
- Depende de uma fórmula de meta recomendada por perfil (peso, nível de
  atividade), a ser validada futuramente com apoio da frente de Nutrição
  (parceria prevista para versões futuras do projeto).
