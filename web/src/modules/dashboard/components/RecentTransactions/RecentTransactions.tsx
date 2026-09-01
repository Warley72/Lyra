import { dashboardMock } from "../../data/dashboard.mock";
import styles from "./recentTransactions.module.scss";

const icons: Record<string, string> = {
    Income: "▣",
    Food: "⌑",
    Housing: "⌂",
    Transport: "↔",
    Health: "✚",
};

export default function RecentTransactions() {
    return (
        <section className={styles.card} aria-labelledby="recent-transactions-title">
            <header className={styles.header}>
                <h2 id="recent-transactions-title">Recent transactions</h2>
                <a href="#transactions">View all</a>
            </header>

            <ul className={styles.list}>
                {dashboardMock.transactions.map((transaction) => {
                    const isIncome = transaction.type === "income";

                    return (
                        <li key={transaction.id}>
                            <span className={`${styles.icon} ${isIncome ? styles.income : ""}`}>
                                {icons[transaction.category] ?? "•"}
                            </span>
                            <div className={styles.description}>
                                <strong>{transaction.description}</strong>
                                <span>{transaction.category}</span>
                            </div>
                            <div className={styles.value}>
                                <strong className={isIncome ? styles.incomeValue : ""}>
                                    {isIncome ? "+" : "−"} $ {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </strong>
                                <span>{transaction.date}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
