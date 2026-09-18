"use client";

import styles from "./modal.module.scss";

interface ModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
    return (
        <div className={styles.overlay} onMouseDown={onClose}>
            <div
                className={styles.modal}
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className={styles.form}>
                    <header className={styles.header}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={onClose}
                        >
                        </button>

                        <h1>Add transaction</h1>
                    </header>

                    <form>
                        <div className={styles.field}>
                            <span>Type</span>

                            <div className={styles.typeOptions}>
                                <button type="button">
                                    ↑ Income
                                </button>

                                <button type="button">
                                    ↓ Expense
                                </button>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="amount">
                                Amount
                            </label>

                            <input
                                id="amount"
                                type="number"
                                placeholder="$ 0.00"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="description">
                                Description
                            </label>

                            <input
                                id="description"
                                type="text"
                                placeholder="Enter description"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="category">
                                    Category
                                </label>

                                <select
                                    id="category"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select category
                                    </option>
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="account">
                                    Account
                                </label>

                                <select
                                    id="account"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select account
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="date">Date</label>

                            <input
                                id="date"
                                type="date"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="notes">
                                Notes (optional)
                            </label>

                            <textarea
                                id="notes"
                                placeholder="Add a note..."
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button type="submit">
                                Save transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
