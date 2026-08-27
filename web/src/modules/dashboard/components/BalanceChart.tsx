import styles from "../pages/DashboardPage/DashboardPage.module.scss";

export function BalanceChart() {
  return <article className={`${styles.panel} ${styles.balancePanel}`}>
    <div className={styles.panelHead}><h2>Evolução do saldo</h2><button>Mensal　⌄</button></div>
    <div className={styles.chartArea}>
      <span className={styles.y1}>R$ 40k</span><span className={styles.y2}>R$ 30k</span><span className={styles.y3}>R$ 20k</span><span className={styles.y4}>R$ 10k</span><span className={styles.y5}>R$ 0</span>
      <svg viewBox="0 0 900 250" preserveAspectRatio="none" aria-label="Gráfico de evolução do saldo">
        <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#633cff" stopOpacity=".38"/><stop offset="1" stopColor="#633cff" stopOpacity=".02"/></linearGradient></defs>
        <path d="M0 202 L64 166 L132 163 L196 128 L261 138 L326 137 L392 122 L458 94 L525 90 L591 98 L655 107 L720 131 L785 127 L840 117 L875 76 L900 48 V250 H0Z" fill="url(#chart-fill)"/>
        <path d="M0 202 L64 166 L132 163 L196 128 L261 138 L326 137 L392 122 L458 94 L525 90 L591 98 L655 107 L720 131 L785 127 L840 117 L875 76 L900 48" fill="none" stroke="#7449ff" strokeWidth="3"/>
        {[['0','202'],['64','166'],['132','163'],['196','128'],['261','138'],['326','137'],['392','122'],['458','94'],['525','90'],['591','98'],['655','107'],['720','131'],['785','127'],['840','117'],['875','76'],['900','48']].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="5" fill="#7449ff"/>)}
      </svg>
      <div className={styles.tooltip}><span>15 Mai</span><strong>R$ 24.350,00</strong></div>
      <div className={styles.xAxis}><span>1 Mai</span><span>8 Mai</span><span>15 Mai</span><span>22 Mai</span><span>29 Mai</span></div>
    </div>
  </article>;
}
