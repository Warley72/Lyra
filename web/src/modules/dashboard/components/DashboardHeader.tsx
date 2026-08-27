import styles from "../pages/DashboardPage/DashboardPage.module.scss";

type Props = {
  onLogout: () => void;
};

export function DashboardHeader({ onLogout }: Props) {
  return <header className={styles.topbar}>
    <div className={styles.brand}><span className={styles.logo}>L</span><strong>Lyra</strong></div>
    <button className={styles.menuButton} aria-label="Abrir menu">☰</button>
    <label className={styles.search}><span>⌕</span><input placeholder="Buscar..." /><kbd>⌘ K</kbd></label>
    <div className={styles.profile}><button className={styles.bell} aria-label="Notificações">♧<i /></button><button className={styles.profileButton} type="button" onClick={onLogout} aria-label="Sair da conta"><span className={styles.avatar}>CW</span><strong>Carlos Warley</strong><span className={styles.chevron}>⌄</span></button></div>
  </header>;
}
