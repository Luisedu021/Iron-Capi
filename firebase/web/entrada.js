// Firebase para as páginas estáticas de docs/ (protótipo no GitHub Pages e painel do time).
// `npm run build:web` gera docs/vendor/firebase.js a partir daqui, sem depender de CDN.
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { browserPopupRedirectResolver, browserSessionPersistence, connectAuthEmulator, initializeAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore/lite';

export { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore/lite';
// signInWithCredential só é usado nos testes com o emulador (login Google falso).
export { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';

let cx = null;

// `cfg` vem de docs/firebase-config.js. App Check (reCAPTCHA Enterprise) liga quando houver chave;
// `emulador` só aparece na configuração de teste local.
export function conectar(cfg, { auth = false } = {}) {
  if (!cx) {
    const app = initializeApp(cfg.firebase);
    if (cfg.appCheckSiteKey) initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(cfg.appCheckSiteKey), isTokenAutoRefreshEnabled: true });
    const db = getFirestore(app);
    if (cfg.emulador) connectFirestoreEmulator(db, ...cfg.emulador.firestore);
    cx = { app, db, auth: null };
  }
  if (auth && !cx.auth) {
    // A sessão do painel vive só na aba: fechou, saiu.
    cx.auth = initializeAuth(cx.app, { persistence: browserSessionPersistence, popupRedirectResolver: browserPopupRedirectResolver });
    if (cfg.emulador) connectAuthEmulator(cx.auth, cfg.emulador.auth, { disableWarnings: true });
  }
  return cx;
}
