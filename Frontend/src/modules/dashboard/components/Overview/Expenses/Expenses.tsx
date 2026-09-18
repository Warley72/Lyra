import styles from "./expenses.module.scss"

interface ExpensesProps {
    title: string;
    value: string;
    variation: string;
}

export function Expenses({ title, value, variation, }: ExpensesProps) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.data}>
                    <strong className={styles.value}>{value}</strong>
                    <small className={styles.variation}>{variation}</small>
                </div>
            </div>
            <span className={styles.icon}>↓</span>
        </div>
    );
}
