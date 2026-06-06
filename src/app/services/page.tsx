import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlgoTrade — Services",
  description: "Explore our algorithmic trading services and API solutions.",
};

const services = [
  {
    title: "Algorithmic execution",
    desc: "Low-latency execution for institutional and retail traders with auto-hedging and smart routing.",
    icon: "⚡",
    status: "Active",
  },
  {
    title: "Portfolio Management",
    desc: "Rebalance and allocate your capital across multiple asset classes automatically based on risk profile.",
    icon: "📈",
    status: "Active",
  },
  {
    title: "Custom Strategy Development",
    desc: "Work with our quant experts to build, backtest, and deploy your custom indicators and algorithms.",
    icon: "🛠️",
    status: "Premium",
  },
  {
    title: "Market Data Feeds",
    desc: "Real-time, ultra-fast web-socket streaming of commodity price indices and trading indicators.",
    icon: "📊",
    status: "Active",
  },
  {
    title: "Historical Backtesting",
    desc: "Test your strategies against 20+ years of high-resolution historical tick data.",
    icon: "⏳",
    status: "Active",
  },
  {
    title: "Risk Analytics Engine",
    desc: "Real-time drawdowns, VaR calculations, and automated margin-call alerts.",
    icon: "🛡️",
    status: "Premium",
  },
];

export default function ServicesPage() {
  return (
    <main className="dashboard-container fade-up">
      <div className="page-header">
        <div>
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">Algorithmic trading capabilities and financial technology services</p>
        </div>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card" id={`service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="service-card__top">
              <span className="service-card__icon">{s.icon}</span>
              <span className={`service-card__status ${s.status === "Premium" ? "status-pending" : "status-active"}`}>
                {s.status}
              </span>
            </div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <button className="btn-primary service-card__btn" id={`activate-${s.title.toLowerCase().replace(/\s+/g, "-")}`}>
              Activate Service
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
