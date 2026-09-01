"use client";

import { useState } from "react";

import styles from "./Sidebar.module.scss";

interface SidebarProps {
    onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {

    const [isOpen, setIsOpen] = useState(false);

    function closeSidebar() {
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                className={styles.menuButton}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                aria-expanded={isOpen}
            >
                ☰
            </button>

            <div
                className={`${styles.overlay} ${
                    isOpen ? styles.overlayVisible : ""
                }`}
                onClick={closeSidebar}
                aria-hidden="true"
            />

            <aside
                className={`${styles.sidebar} ${
                    isOpen ? styles.sidebarOpen : ""
                }`}
            >
                <div className={styles.logo}>
                    <span>Lyra</span>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={closeSidebar}
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>

                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <a
                                href="/dashboard"
                                className={styles.active}
                                onClick={closeSidebar}
                            >
                                <span className={styles.icon}>⌂</span>
                                <span>Dashboard</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/transactions"
                                onClick={closeSidebar}
                            >
                                <span className={styles.icon}>⇄</span>
                                <span>Transactions</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/accounts"
                                onClick={closeSidebar}
                            >
                                <span className={styles.icon}>▢</span>
                                <span>Accounts</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/categories"
                                onClick={closeSidebar}
                            >
                                <span className={styles.icon}>◇</span>
                                <span>Categories</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/reports"
                                onClick={closeSidebar}>
                                <span className={styles.icon}>▥</span>
                                <span>Reports</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/settings"
                                onClick={closeSidebar}
                            >
                                <span className={styles.icon}>⚙</span>
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className={styles.logout}>
                    <button
                        type="button"
                        onClick={onLogout}
                    >
                        <span className={styles.icon}>⇥</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
