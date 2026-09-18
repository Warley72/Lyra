import { dashboardMock } from "../../data/dashboard.mock";

import styles from "./spendingOverview.module.scss";

export default function SpendingOverview() {
    const { categories, total } = dashboardMock.spending;

    return (
        <section className={styles.card} aria-labelledby="spending-title">
            <header className={styles.header}>
                <h2 id="spending-title">Spending overview</h2>
            </header>

            <div className={styles.content}>
                <div className={styles.donut} aria-label={`Total spending: $ ${total.toFixed(2)}`} />

                <ul className={styles.legend}>
                    {categories.map((category, index) => (
                        <li key={category.name}>
                            <i className={styles[`tone${index + 1}`]} />
                            <span>{category.name}</span>
                            <strong>$ {category.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
                            <em>{category.percentage}%</em>
                        </li>
                    ))}
                </ul>
            </div>

            <footer className={styles.footer}>
                <span>Total</span>
                <strong>$ {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
            </footer>
        </section>
    );
}
