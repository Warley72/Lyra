import { dashboardMock } from "../data/dashboard.mock";
import styles from "../pages/DashboardPage/DashboardPage.module.scss";

export function GoalsCard() {
  return <article className={`${styles.panel} ${styles.goalsPanel}`}><div className={styles.panelHead}><h2>Metas</h2><a href="#metas">Ver todas</a></div><ul>{dashboardMock.goals.map((goal) => <li key={goal.name}><i>{goal.icon}</i><div><strong>{goal.name}</strong><span>{goal.amount}</span><div className={styles.progress}><b style={{ width: `${goal.progress}%` }} /></div></div><em>{goal.progress}%</em></li>)}</ul></article>;
}
