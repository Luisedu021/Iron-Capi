# Firebase do Iron Capi

Por enquanto o Firebase guarda uma coisa: a **lista de espera** de quem quer testar o app quando ele estiver pronto.

- O protótipo publicado no GitHub Pages (`docs/index.html`) tem um cartão "Quer testar o app de verdade?" na tela inicial que grava o e-mail na coleção `lista_espera`.
- O **painel do time** (`docs/painel/`, no ar em `https://luisedu021.github.io/Iron-Capi/painel/`) mostra a lista, exporta CSV e remove pessoas que pedirem para sair.

## Como os dados ficam protegidos

Quem decide o acesso são as regras de [`firestore.rules`](firestore.rules), que rodam nos servidores do Google. As páginas não decidem nada.

- **Qualquer pessoa** pode se inscrever, mas só com e-mail válido e consentimento marcado. Ela também não consegue sobrescrever outra inscrição nem escolher a data.
- **Ninguém de fora** lê, altera ou apaga a lista, nem quem estiver logado.
- **Só admins** leem e removem. Admin é quem entra com uma conta Google verificada **e** tem um documento em `admins/{e-mail}`. Esse documento só pode ser criado pelo console do Firebase: nenhum app ou página consegue se promover a admin.
- A sessão do painel termina ao fechar a aba ou depois de 30 minutos sem uso.
- O celular do teste guarda só o e-mail mascarado (`an••••@gmail.com`).

Os testes em [`test/regras.test.mjs`](test/regras.test.mjs) conferem tudo isso no emulador do Firebase.

> A configuração em `docs/firebase-config.js` (apiKey, projectId…) **não é senha**: só diz qual projeto usar. Ela fica pública em qualquer site com Firebase. A proteção vem das regras, do App Check e da restrição da chave (passos 7 e 8).

## Configuração (uma vez)

1. **Criar o projeto:** em [console.firebase.google.com](https://console.firebase.google.com), crie o projeto `iron-capi`. O Google Analytics pode ficar desligado.
2. **Firestore:** em *Firestore Database › Criar banco*, escolha o **modo de produção** e o local **`southamerica-east1` (São Paulo)**. O local não muda depois.
3. **Regras:** em *Firestore › Regras*, cole o conteúdo de `firestore.rules` e publique. Pela linha de comando, rode `npm run deploy:regras` depois do passo "Rodar os testes".
4. **Login do painel:** em *Authentication › Método de login*, ative **Google**. Em *Authentication › Configurações › Domínios autorizados*, adicione `luisedu021.github.io`.
5. **Admins:** em *Firestore › Dados*, crie a coleção `admins`. Adicione um documento por pessoa do time, com o **ID igual ao e-mail Google dela** (ex.: `fulano@gmail.com`) e um campo `nome`.
6. **Ligar as páginas ao projeto:** em *Configurações do projeto › Seus apps*, registre um app **Web** (`</>`). Copie `apiKey`, `authDomain`, `projectId` e `appId` para `docs/firebase-config.js`, seguindo o exemplo comentado no arquivo, e faça commit.
7. **App Check (recomendado, contra robôs):** em *App Check*, registre o app Web com **reCAPTCHA Enterprise** (domínio `luisedu021.github.io`) e coloque a chave do site em `appCheckSiteKey`. Depois de ver inscrições chegando com o App Check verificado, clique em **Aplicar** para o Firestore.
8. **Restringir a chave:** no [Google Cloud Console › Credenciais](https://console.cloud.google.com/apis/credentials), abra a "Browser key" do projeto. Em *Restrições de aplicativo*, escolha *Sites* e adicione `https://luisedu021.github.io/*`.
9. **Conferir:** abra o protótipo publicado, inscreva o seu e-mail e veja se ele aparece no painel.

## Rodar os testes e publicar as regras

Precisa de Node 20+ e Java 11+ (o emulador do Firestore roda em Java).

```bash
cd firebase
npm install
npm test               # testa as regras no emulador; não toca o projeto real
npx firebase login
npx firebase use --add # escolha o projeto iron-capi
npm run deploy:regras
```

Toda mudança em `firestore.rules` deve vir com teste em `test/` e passar no `npm test` antes do deploy.

## Atualizar o SDK das páginas

`docs/vendor/firebase.js` é gerado a partir de `web/entrada.js`, sem depender de CDN:

```bash
cd firebase
npm run build:web
```

## Checklist de segurança (repositório público)

Revisão feita em 22/10/2026 no projeto `iron-capi-9d812`. O que já está certo:

- A lista de espera não pode ser lida de fora, nem logado, e as outras coleções estão fechadas.
- As regras publicadas são as deste repositório. A inscrição sem consentimento é recusada e o e-mail repetido também.
- O login aceita só os domínios autorizados (`luisedu021.github.io`) e a proteção contra descobrir contas por e-mail está ligada.
- A chave da API só abre APIs do Firebase (a do Gemini, por exemplo, é bloqueada).
- O histórico do Git não tem senhas, contas de serviço nem tokens. A única chave é a configuração web do Firebase, que é pública por natureza.
- O painel mostra os dados sempre como texto (sem HTML), protege o CSV contra fórmulas e se recusa a abrir dentro de outro site.

O que ainda falta, em ordem de prioridade:

1. **Ligar o App Check (reCAPTCHA Enterprise) e clicar em Aplicar no Firestore.** Sem isso, um robô consegue inscrever e-mails falsos direto pela API, sem passar pelo site. É o passo mais importante antes de divulgar o link.
2. **Restringir a chave por site** (passo 8 da configuração). Hoje ela aceita chamadas de qualquer origem. Libere `https://luisedu021.github.io/*`, `https://iron-capi-9d812.firebaseapp.com/*` e `http://localhost/*`.
3. **Confirmar o e-mail antes de convidar.** Qualquer pessoa pode inscrever o e-mail de outra. O primeiro e-mail do teste deve pedir confirmação ("clique para confirmar que quer testar"), e quem não confirmar sai da lista.
4. **Conferir no console** que o Realtime Database não foi criado (ou está com as regras fechadas) e que o Storage, se for ativado, começa no modo de produção.
5. **No GitHub:**
   - ligar o *secret scanning* com *push protection* e os alertas do Dependabot (Settings › Code security);
   - proteger o `main` contra force-push e exigir pull request;
   - quem não quiser o e-mail pessoal nos commits pode usar o e-mail `noreply` do GitHub (Settings › Emails).

Risco aceito: dá para descobrir se um e-mail específico já está na lista, porque a tentativa de inscrevê-lo de novo é recusada. Isso evita inscrições duplicadas e não expõe nenhum outro dado.

## LGPD

- A pessoa consente ao marcar a caixa. A finalidade é só avisar quando o app estiver pronto para teste.
- Pedidos para sair da lista: remova pelo painel (ícone de lixeira).
- Quando o teste começar e os convites forem enviados, apaguem a lista se ela não for mais necessária.
