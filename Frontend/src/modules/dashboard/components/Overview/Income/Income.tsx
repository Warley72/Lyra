import styles from './income.module.scss';

interface IncomeProps {
    title: string;
    value: string;
    variation: string;
}

export function Income({ title, value, variation }: IncomeProps) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                <div className={styles.data}>
                    <p className={styles.value}>{value}</p>
                    <small className={styles.variation}>{variation}</small>
                </div>
            </div>
            <span className={styles.icon}>↑</span>
        </div>
    )
}
