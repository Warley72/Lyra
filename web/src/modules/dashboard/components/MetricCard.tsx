import styles from "../pages/DashboardPage/DashboardPage.module.scss";

type Props = { metric: { label: string; value: string; change: string; tone: string; icon: string } };

export function MetricCard({ metric }: Props) {
  const isNegative = metric.change.includes("↓");
  return <article className={styles.metricCard}>
    <span className={`${styles.metricIcon} ${styles[metric.tone]}`}>{metric.icon}</span>
    <div><p>{metric.label}</p><strong>{metric.value}</strong><small className={isNegative ? styles.negative : styles.positive}>{metric.change} <em>vs Abril</em></small></div>
  </article>;
}
