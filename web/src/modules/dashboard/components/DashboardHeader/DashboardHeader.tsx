"use client";

import { dashboardMock } from "../../data/dashboard.mock";

import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderProps {
    onLogout: () => void;
    onMenuToggle?: () => void;
}

export default function DashboardHeader({ onLogout, onMenuToggle }: DashboardHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.mobileBar}>
                <span className={styles.mobileLogo}>Lyra</span>
            </div>
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.notification}
                    aria-label="Notificações"
                >
                    🔔︎
                </button>

                <button
                    type="button"
                    className={styles.profile}
                    onClick={onLogout}
                    aria-label="Logout"
                >
                    C
                </button>
            </div>
            <div className={styles.greeting}>
                <h1>Good evening, {dashboardMock.user.name}</h1>
                <p>Here's what's happening with your finances.</p>
            </div>
        </header>
    );
}
