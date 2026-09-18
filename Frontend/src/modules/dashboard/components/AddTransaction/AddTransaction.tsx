"use client";

import styles from "./addTransaction.module.scss";

interface AddTransactionProps {
    onClose: () => void;
}

export default function AddTransaction({ onClose }: AddTransactionProps) {
    return (
        <div className={styles.form}>
            <header className={styles.header}>
                <button
                    type="button"
                    onClick={onClose}
                >
                    ←
                </button>

                <h1>Add transaction</h1>
            </header>
        </div>
    );
}
