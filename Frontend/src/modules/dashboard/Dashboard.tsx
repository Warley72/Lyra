"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { clearAuthToken, getAuthToken, validateAuthToken } from "@/modules/auth";

import styles from "./Dashboard.module.scss";

import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import Sidebar from "./components/Sidebar/Sidebar";
import Overview from "./components/Overview/Overview";
import SpendingOverview from "./components/SpendingOverview/SpendingOverview";
import RecentTransactions from "./components/RecentTransactions/RecentTransactions";
import MonthlyProgress from "./components/MonthlyProgress/MonthlyProgress";
import Modal from "./components/Modal/AddTransaction";

export default function DashboardPage() {

    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

    useEffect(() => {
        const authToken = getAuthToken();

        if (!authToken) {
            router.replace("/login");
            return;
        }

        let active = true;

        void validateAuthToken(authToken)
            .then(() => {
                if (active) {
                    setIsAuthorized(true);
                }
            })
            .catch(() => {
                clearAuthToken();
                router.replace("/login");
            });

        return () => {
            active = false;
        };
    }, [router]);

    if (!isAuthorized) {
        return null;
    }

    function handleLogout() {
        clearAuthToken();
        router.replace("/login");
    }

    return (
        <main className={styles.dashboard}>

            <Sidebar onLogout={handleLogout} />

            <section className={styles.content}>
                <DashboardHeader
                    onLogout={handleLogout}
                    onAddTransaction={() =>
                        setIsTransactionModalOpen(true)
                    }
                />

                <Overview />

                <section className={styles.widgetsGrid}>
                    <SpendingOverview />
                    <RecentTransactions />
                </section>

                <section className={styles.progressSection}>
                    <MonthlyProgress />
                </section>

                {isTransactionModalOpen && (
                    <Modal
                        onClose={() =>
                            setIsTransactionModalOpen(false)
                        }
                    >
                    </Modal>
                )}
            </section>
        </main>
    );
}
