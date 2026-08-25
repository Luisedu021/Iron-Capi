# ADR-0001: Uso de React Native (Expo) como stack de frontend mobile

## Status
Aceito

## Contexto
O Iron Capi precisa ser distribuído nas duas principais plataformas mobile
(Android e iOS), mas a equipe é pequena (Squad de 4 desenvolvedores) e o
projeto tem prazo definido de 1 ano (Iniciação Científica). Manter dois
códigos-base nativos (Kotlin/Swift) exigiria mais tempo e mão de obra do que
o squad dispõe.

## Decisão
Utilizar **React Native com Expo** como framework de frontend mobile,
permitindo gerar o aplicativo nativo para Android e iOS a partir de um único
código-base em JavaScript/TypeScript.

## Alternativas Consideradas
- **Nativo (Kotlin + Swift separados)** — melhor performance e acesso total à
  API da plataforma, porém exige o dobro de esforço de desenvolvimento e
  conhecimento em duas linguagens distintas, inviável para o tamanho do squad.
- **Flutter** — também multiplataforma e com boa performance, mas a equipe já
  tem mais familiaridade com o ecossistema JavaScript/React, o que reduz a
  curva de aprendizado.
- **React Native (bare, sem Expo)** — mais flexível para módulos nativos
  customizados, mas exige configuração de ambiente nativo (Android
  Studio/Xcode) mais pesada, o que o Expo abstrai.

## Consequências
- Desenvolvimento mais rápido com um único código-base para as duas plataformas.
- Acesso facilitado a bibliotecas do ecossistema React/JS.
- Possíveis limitações de performance ou acesso a APIs nativas muito
  específicas, mitigáveis com Expo Config Plugins ou eventual "eject" para
  bare workflow, se necessário.
- Toda a equipe precisa ter, ou desenvolver, conhecimento em
  JavaScript/TypeScript e React.
