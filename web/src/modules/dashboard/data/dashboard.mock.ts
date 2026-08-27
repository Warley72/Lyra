export const dashboardMock = {
  userName: "Carlos",
  month: "Maio, 2025",
  metrics: [
    { label: "Saldo total", value: "R$ 24.350,00", change: "↑ 8,2%", tone: "purple", icon: "▣" },
    { label: "Receitas", value: "R$ 500.00", change: "↑ 2,4%", tone: "green", icon: "↗" },
    { label: "Despesas", value: "R$ 8.100,00", change: "↓ 3,6%", tone: "red", icon: "↘" },
    { label: "Taxa de poupança", value: "24,8%", change: "↑ 5,7%", tone: "purple", icon: "◔" },
  ],
  categories: [
    { label: "Moradia", value: "35%", color: "#7046ff" },
    { label: "Alimentação", value: "25%", color: "#3164f4" },
    { label: "Transporte", value: "15%", color: "#42c878" },
    { label: "Saúde", value: "10%", color: "#ffb62f" },
    { label: "Outros", value: "15%", color: "#5d6168" },
  ],
  accounts: [
    { name: "Carteira", amount: "R$ 4.250,00", icon: "▦" },
    { name: "Conta Corrente", amount: "R$ 12.850,00", icon: "▦" },
    { name: "Nubank", amount: "R$ 5.600,00", icon: "N" },
    { name: "Poupança", amount: "R$ 1.650,00", icon: "⌂" },
  ],
  transactions: [
    { name: "Supermercado Extra", category: "Alimentação", amount: "- R$ 156,90", date: "Hoje", icon: "▣", tone: "purple" },
    { name: "Salário", category: "Receita", amount: "+ R$ 4.500,00", date: "Hoje", icon: "♙", tone: "green" },
    { name: "Uber", category: "Transporte", amount: "- R$ 28,50", date: "Ontem", icon: "▱", tone: "orange" },
    { name: "Freelance", category: "Receita", amount: "+ R$ 1.250,00", date: "Ontem", icon: "♙", tone: "green" },
    { name: "Netflix", category: "Assinatura", amount: "- R$ 55,90", date: "12 Mai", icon: "N", tone: "purple" },
  ],
  goals: [
    { name: "Reserva de emergência", amount: "R$ 8.450,00 / R$ 15.000,00", progress: 56, icon: "♢" },
    { name: "Viagem", amount: "R$ 2.300,00 / R$ 5.000,00", progress: 36, icon: "♧" },
  ],
};
