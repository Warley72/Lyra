import { dashboardMock } from "../data/dashboard.mock";
import styles from "../pages/DashboardPage/DashboardPage.module.scss";

export function AccountsCard() {
  return <article className={`${styles.panel} ${styles.accountsPanel}`}><h2>Contas</h2><ul className={styles.accountsList}>{dashboardMock.accounts.map((account) => <li key={account.name}><i>{account.icon}</i><span>{account.name}</span><b>{account.amount}</b><em>›</em></li>)}</ul><a href="#contas">Ver todas as contas <b>›</b></a></article>;
}
