"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthToken, getAuthToken, validateAuthToken } from "@/modules/auth";
import { dashboardMock } from "../../data/dashboard.mock";
import { AccountsCard } from "../../components/AccountsCard";
import { BalanceChart } from "../../components/BalanceChart";
import { CategoryChart } from "../../components/CategoryChart";
import { DashboardHeader } from "../../components/DashboardHeader";
import { GoalsCard } from "../../components/GoalsCard";
import { MetricCard } from "../../components/MetricCard";
import { TransactionsCard } from "../../components/TransactionsCard";

import styles from "./DashboardPage.module.scss";

export function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authToken = getAuthToken();
    if (!authToken) { router.replace("/login"); return; }
    const token = authToken;
    let active = true;
    void validateAuthToken(token).then(() => { if (active) setIsAuthorized(true); }).catch(() => { clearAuthToken(); router.replace("/login"); });
    return () => { active = false; };
  }, [router]);

  if (!isAuthorized) return null;

  function handleLogout() {
    clearAuthToken();
    router.replace("/login");
  }

  return <main className={styles.dashboard}>
    <DashboardHeader onLogout={handleLogout} />
    <div className={styles.content}>
      <section className={styles.welcome}><div><h1>Olá, {dashboardMock.userName} </h1><p>Aqui está o resumo das suas finanças.</p></div><button className={styles.monthButton}>▣　{dashboardMock.month}　⌄</button></section>
      <section className={styles.metrics}>{dashboardMock.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</section>
      <section className={styles.insights}><BalanceChart /><CategoryChart /></section>
      <section className={styles.bottomGrid}><AccountsCard /><TransactionsCard /><GoalsCard /></section>
    </div>
  </main>;
}
