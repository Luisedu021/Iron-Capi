// Configuração do Firebase para as páginas do GitHub Pages (protótipo e painel do time).
// Estes valores não são senha: só dizem qual projeto usar. Quem protege os e-mails são as regras
// de firebase/firestore.rules. Enquanto for `null`, a lista de espera do protótipo fica em modo
// demonstração (avisa a pessoa e não envia nada). Passo a passo em firebase/README.md.
window.IRON_FIREBASE = null;

// Depois de criar o projeto, troque a linha acima por algo assim:
// window.IRON_FIREBASE = {
//   firebase: {
//     apiKey: 'AIza...',
//     authDomain: 'iron-capi.firebaseapp.com',
//     projectId: 'iron-capi',
//     appId: '1:000000000000:web:0000000000000000',
//   },
//   appCheckSiteKey: '', // chave do reCAPTCHA Enterprise (recomendado, veja o README)
// };
