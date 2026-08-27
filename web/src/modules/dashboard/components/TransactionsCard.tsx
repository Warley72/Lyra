import { dashboardMock } from "../data/dashboard.mock";
import styles from "../pages/DashboardPage/DashboardPage.module.scss";

export function TransactionsCard() {
  return <article className={`${styles.panel} ${styles.transactionsPanel}`}><div className={styles.panelHead}><h2>Transações recentes</h2><a href="#transacoes">Ver todas</a></div><ul className={styles.transactionList}>{dashboardMock.transactions.map((transaction) => <li key={transaction.name}><i className={styles[transaction.tone]}>{transaction.icon}</i><strong>{transaction.name}</strong><span>{transaction.category}</span><b className={transaction.amount.startsWith('+') ? styles.positive : ""}>{transaction.amount}</b><em>{transaction.date}</em></li>)}</ul></article>;
}
