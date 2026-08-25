# ADR-0002: Uso de Firebase como Banco de Dados e BaaS

## Status
Aceito

## Contexto
O aplicativo precisa de autenticação de usuários, armazenamento de dados em
tempo real (fichas de treino, XP, progresso) e armazenamento de imagens
(cosméticos, avatar), com prazo de implementação curto e equipe reduzida
para administrar infraestrutura própria.

## Decisão
Utilizar **Firebase** como Backend-as-a-Service, combinando:
- **Firestore** como banco de dados NoSQL em tempo real;
- **Firebase Auth** para autenticação (E-mail/Senha ou Google);
- **Firebase Storage** para armazenamento de imagens e cosméticos.

## Alternativas Consideradas
- **Backend próprio com banco relacional (PostgreSQL/MySQL)** — mais controle
  sobre o modelo de dados e queries complexas, porém exige provisionar e
  manter infraestrutura de servidor, algo fora do escopo de tempo do squad.
- **Supabase** — alternativa open-source ao Firebase com banco relacional,
  também viável, mas a equipe já tinha mais familiaridade e exemplos prontos
  com o ecossistema Firebase.

## Consequências
- Redução significativa do tempo de setup de backend, autenticação e storage.
- Escalabilidade e sincronização em tempo real "de fábrica", útil para
  features futuras como o Feed Social.
- Modelagem de dados NoSQL exige desnormalização e planejamento cuidadoso das
  coleções (ex: XP, níveis, fichas de treino) para evitar leituras/escritas
  excessivas.
- Dependência de um provedor específico (vendor lock-in) e de sua política de
  custos conforme o app escalar.
