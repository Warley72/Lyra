import { dashboardMock } from "../../data/dashboard.mock";

import styles from "./monthlyProgress.module.scss";

function formatCurrency(value: number) {
    return `$ ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export default function MonthlyProgress() {
    const { spent, budget, remaining } = dashboardMock.monthlyProgress;
    const progress = Math.min((spent / budget) * 100, 100);

    return (
        <section className={styles.card} aria-labelledby="monthly-progress-title">
            <header className={styles.header}>
                <h2 id="monthly-progress-title">Monthly progress</h2>
            </header>

            <div className={styles.details}>
                <span>{formatCurrency(spent)} spent</span>
                <span>{formatCurrency(remaining)} left</span>
                <span>of {formatCurrency(budget)}</span>
            </div>

            <div className={styles.progress} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Monthly budget progress">
                <span style={{ width: `${progress}%` }} />
            </div>
        </section>
    );
}
