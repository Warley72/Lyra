import styles from './totalBalance.module.scss';

interface TotalBalanceProps {
    title: string;
    value: string;
}

export function TotalBalance({ title, value }: TotalBalanceProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
            </div>
            <div>
                <div>
                    <strong className={styles.value}>{value}</strong>
                </div>
                <div>
                    <span className={styles.icon}>▣</span>
                </div>
            </div>
        </div>
    )
}
