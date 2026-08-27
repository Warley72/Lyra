import { dashboardMock } from "../data/dashboard.mock";
import styles from "../pages/DashboardPage/DashboardPage.module.scss";

export function CategoryChart() {
  return <article className={`${styles.panel} ${styles.categoryPanel}`}><h2>Despesas por categoria</h2><div className={styles.categoryBody}>
    <div className={styles.donut}><div><strong>R$ 8.100,00</strong><span>Total</span></div></div>
    <ul>{dashboardMock.categories.map((category) => <li key={category.label}><i style={{ background: category.color }} /><span>{category.label}</span><b>{category.value}</b></li>)}</ul>
  </div></article>;
}
