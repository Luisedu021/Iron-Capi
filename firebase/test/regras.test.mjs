// Testes das regras do Firestore no emulador (nada toca o projeto real).
// Rodar dentro de firebase/: npm install && npm test
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { after, before, beforeEach, describe, test } from 'node:test';

import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const sha = email => createHash('sha256').update(email).digest('hex');
const inscricao = (email, extra = {}) => ({ email, consentimento: true, origem: 'teste', criadoEm: serverTimestamp(), ...extra });
const ADMIN = 'time@ironcapi.dev';

let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-iron-capi',
    firestore: { rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8') },
  });
});
after(() => env.cleanup());
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => {
    await setDoc(doc(ctx.firestore(), 'admins', ADMIN), { nome: 'Time Iron Capi' });
    await setDoc(doc(ctx.firestore(), 'lista_espera', sha('ja@inscrito.com')), { email: 'ja@inscrito.com', consentimento: true, origem: 'teste', criadoEm: new Date() });
  });
});

const anonimo = () => env.unauthenticatedContext().firestore();
const logado = (email, verificado = true) => env.authenticatedContext(email, { email, email_verified: verificado }).firestore();

describe('inscrição na lista de espera', () => {
  test('qualquer pessoa se inscreve com e-mail válido', async () => {
    await assertSucceeds(setDoc(doc(anonimo(), 'lista_espera', sha('ana@gmail.com')), inscricao('ana@gmail.com')));
    await assertSucceeds(setDoc(doc(anonimo(), 'lista_espera', sha('ana.silva+iron@ufms.br')), inscricao('ana.silva+iron@ufms.br')));
  });
  test('o mesmo e-mail não entra duas vezes nem sobrescreve', async () => {
    await assertFails(setDoc(doc(anonimo(), 'lista_espera', sha('ja@inscrito.com')), inscricao('ja@inscrito.com')));
  });
  test('id que não é o hash do e-mail é recusado', async () => {
    await assertFails(setDoc(doc(anonimo(), 'lista_espera', sha('outro@gmail.com')), inscricao('ana@gmail.com')));
    await assertFails(setDoc(doc(anonimo(), 'lista_espera', 'qualquer'), inscricao('ana@gmail.com')));
  });
  test('campos extras, sem consentimento, e-mail inválido ou em maiúsculas são recusados', async () => {
    const db = anonimo();
    for (const [email, extra] of [
      ['ana@gmail.com', { senha: '123' }],
      ['ana@gmail.com', { consentimento: false }],
      ['ana@gmail.com', { criadoEm: new Date('2020-01-01') }],
      ['ana@gmail.com', { origem: 'x'.repeat(41) }],
      ['Ana@Gmail.com', {}],
      ['sem-arroba', {}],
      ['a@b', {}],
      ['ana@gmail', {}],
      ['<svg/onload=alert(1)>@a.bc', {}],
      ['"ana"@gmail.com', {}],
    ]) await assertFails(setDoc(doc(db, 'lista_espera', sha(email)), inscricao(email, extra)));
  });
});

describe('leitura e remoção', () => {
  test('ninguém de fora lê a lista', async () => {
    await assertFails(getDocs(collection(anonimo(), 'lista_espera')));
    await assertFails(getDoc(doc(anonimo(), 'lista_espera', sha('ja@inscrito.com'))));
    await assertFails(getDocs(collection(logado('curioso@gmail.com'), 'lista_espera')));
  });
  test('quem não é admin não apaga nem altera', async () => {
    await assertFails(deleteDoc(doc(logado('curioso@gmail.com'), 'lista_espera', sha('ja@inscrito.com'))));
    await assertFails(updateDoc(doc(anonimo(), 'lista_espera', sha('ja@inscrito.com')), { origem: 'hack' }));
  });
  test('admin lê e apaga (pedido de remoção pela LGPD), mas não altera', async () => {
    const db = logado(ADMIN);
    await assertSucceeds(getDocs(collection(db, 'lista_espera')));
    await assertFails(updateDoc(doc(db, 'lista_espera', sha('ja@inscrito.com')), { origem: 'x' }));
    await assertSucceeds(deleteDoc(doc(db, 'lista_espera', sha('ja@inscrito.com'))));
  });
  test('admin com e-mail não verificado não lê', async () => {
    await assertFails(getDocs(collection(logado(ADMIN, false), 'lista_espera')));
  });
});

describe('quem é admin', () => {
  test('cada pessoa só consegue conferir o próprio registro', async () => {
    await assertSucceeds(getDoc(doc(logado(ADMIN), 'admins', ADMIN)));
    await assertSucceeds(getDoc(doc(logado('curioso@gmail.com'), 'admins', 'curioso@gmail.com')));
    await assertFails(getDocs(collection(logado(ADMIN), 'admins')));
  });
  test('ninguém se promove a admin pelo app, nem outro admin', async () => {
    await assertFails(setDoc(doc(logado('curioso@gmail.com'), 'admins', 'curioso@gmail.com'), { nome: 'eu' }));
    await assertFails(setDoc(doc(logado(ADMIN), 'admins', 'amigo@gmail.com'), { nome: 'amigo' }));
  });
  test('o resto do banco fica fechado', async () => {
    await assertFails(setDoc(doc(anonimo(), 'usuarios', 'x'), { a: 1 }));
    await assertFails(getDocs(collection(logado(ADMIN), 'usuarios')));
  });
});
