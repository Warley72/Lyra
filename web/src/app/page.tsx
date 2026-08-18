"use client";

import { FormEvent, useState } from "react";
import { createUser, deleteUser, getUsers, login, updateUser, type User } from "@/app/services/api";
import styles from "./page.module.scss";

type Message = { type: "success" | "error"; text: string } | null;
const emptyRegistration = { name: "", email: "", password: "" };
const emptyLogin = { email: "", password: "" };

export default function Home() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [registration, setRegistration] = useState(emptyRegistration);
  const [credentials, setCredentials] = useState(emptyLogin);
  const [editing, setEditing] = useState(emptyRegistration);
  const [message, setMessage] = useState<Message>(null);
  const [busy, setBusy] = useState(false);

  async function loadCurrentUser(currentToken: string) {
    try {
      const users = await getUsers(currentToken);
      const currentUser = users[0];
      if (!currentUser) throw new Error("Usuário não encontrado.");
      setToken(currentToken);
      setUser(currentUser);
      setEditing({ name: currentUser.name, email: currentUser.email, password: "" });
    } catch (error) {
      setToken("");
      setUser(null);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Não foi possível carregar o usuário." });
    }
  }

  async function handleRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(null);
    try {
      await createUser(registration);
      setCredentials({ email: registration.email, password: registration.password });
      setRegistration(emptyRegistration);
      setMessage({ type: "success", text: "Usuário criado. Agora entre com os dados cadastrados." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Não foi possível criar o usuário." });
    } finally { setBusy(false); }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(null);
    try {
      const { token: accessToken } = await login(credentials.email, credentials.password);
      await loadCurrentUser(accessToken);
      setCredentials(emptyLogin);
      setMessage({ type: "success", text: "Login realizado com sucesso." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Não foi possível entrar." });
    } finally { setBusy(false); }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!user) return;
    setBusy(true); setMessage(null);
    try {
      const data = { name: editing.name, email: editing.email, ...(editing.password ? { password: editing.password } : {}) };
      const updatedUser = await updateUser(user.id, data, token);
      setUser(updatedUser);
      setEditing({ name: updatedUser.name, email: updatedUser.email, password: "" });
      setMessage({ type: "success", text: "Dados atualizados." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Não foi possível atualizar os dados." });
    } finally { setBusy(false); }
  }

  async function handleDelete() {
    if (!user || !window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    setBusy(true);
    try {
      await deleteUser(user.id, token);
      handleLogout();
      setMessage({ type: "success", text: "Usuário excluído." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Não foi possível excluir o usuário." });
    } finally { setBusy(false); }
  }

  function handleLogout() {
    setToken(""); setUser(null); setEditing(emptyRegistration);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>LYRA / API PLAYGROUND</p>
        <h1>Teste o CRUD de usuários.</h1>
        <p>Cadastre uma conta, entre e edite ou exclua seus dados diretamente pela interface.</p>
      </section>

      {message && <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>}

      {!user ? (
        <div className={styles.authGrid}>
          <form className={styles.card} onSubmit={handleRegistration}>
            <div className={styles.cardHeader}><span>01</span><h2>Criar usuário</h2></div>
            <label>Nome<input required minLength={2} value={registration.name} onChange={(e) => setRegistration({ ...registration, name: e.target.value })} /></label>
            <label>E-mail<input required type="email" value={registration.email} onChange={(e) => setRegistration({ ...registration, email: e.target.value })} /></label>
            <label>Senha<input required type="password" minLength={6} value={registration.password} onChange={(e) => setRegistration({ ...registration, password: e.target.value })} /></label>
            <button disabled={busy} type="submit">{busy ? "Processando..." : "Cadastrar"}</button>
          </form>
          <form className={styles.card} onSubmit={handleLogin}>
            <div className={styles.cardHeader}><span>02</span><h2>Entrar</h2></div>
            <label>E-mail<input required type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} /></label>
            <label>Senha<input required type="password" minLength={6} value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} /></label>
            <button disabled={busy} type="submit">{busy ? "Processando..." : "Fazer login"}</button>
          </form>
        </div>
      ) : (
        <section className={styles.dashboard}>
          <div className={styles.userSummary}>
            <div><p className={styles.eyebrow}>SESSÃO ATIVA</p><h2>{user.name}</h2><p>{user.email}</p></div>
            <button className={styles.secondaryButton} onClick={handleLogout}>Sair</button>
          </div>
          <form className={styles.editCard} onSubmit={handleUpdate}>
            <div className={styles.cardHeader}><span>03</span><h2>Editar usuário</h2></div>
            <div className={styles.fields}>
              <label>Nome<input required minLength={2} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
              <label>E-mail<input required type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></label>
              <label>Nova senha <small>(opcional)</small><input type="password" minLength={6} value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} /></label>
            </div>
            <div className={styles.actions}>
              <button disabled={busy} type="submit">{busy ? "Salvando..." : "Salvar alterações"}</button>
              <button disabled={busy} className={styles.dangerButton} type="button" onClick={handleDelete}>Excluir usuário</button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
