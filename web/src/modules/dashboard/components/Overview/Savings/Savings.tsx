import styles from "./savings.module.scss"

interface SavingsProps {
    title: string;
    value: string;
}

export function Savings({ title, value }: SavingsProps) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <span className={styles.title}>
                    {title}
                </span>

                <div className={styles.data}>
                    <strong className={styles.value}>
                        {value}
                    </strong>
                </div>
            </div>

            <span className={styles.icon}>♧</span>
        </div>
    );
}
