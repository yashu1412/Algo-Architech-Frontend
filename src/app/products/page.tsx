import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AlgoTrade — Products",
  description: "Explore commodity trading instruments and financial products.",
};

const commodities = [
  { name: "Gold",          symbol: "XAU/USD", value: "2,345.80", change: "+1.24", pos: true,  icon: "🥇", desc: "Safe-haven precious metal tracked globally." },
  { name: "Crude Oil",     symbol: "WTI/USD", value: "78.42",    change: "-0.87", pos: false, icon: "🛢️", desc: "West Texas Intermediate benchmark crude." },
  { name: "Natural Gas",   symbol: "NG/USD",  value: "2.18",     change: "+3.61", pos: true,  icon: "🔥", desc: "Key energy commodity for heating and power." },
  { name: "Silver",        symbol: "XAG/USD", value: "29.14",    change: "+0.95", pos: true,  icon: "🥈", desc: "Industrial & investment precious metal." },
  { name: "Copper",        symbol: "HG/USD",  value: "4.53",     change: "-1.10", pos: false, icon: "🔶", desc: "Industrial bellwether used in construction." },
  { name: "Wheat",         symbol: "W/USD",   value: "554.25",   change: "+2.08", pos: true,  icon: "🌾", desc: "Global staple grain futures contract." },
  { name: "Corn",          symbol: "C/USD",   value: "448.75",   change: "-0.42", pos: false, icon: "🌽", desc: "Major agricultural commodity and biofuel." },
  { name: "Platinum",      symbol: "XPT/USD", value: "1,014.60", change: "+0.68", pos: true,  icon: "⚪", desc: "Rare metal used in catalytic converters." },
  { name: "Brent Oil",     symbol: "BRN/USD", value: "82.17",    change: "-0.53", pos: false, icon: "⛽", desc: "International crude oil price benchmark." },
  { name: "Soybeans",      symbol: "S/USD",   value: "1,182.50", change: "+1.32", pos: true,  icon: "🫘", desc: "High-demand oilseed for food & feed." },
  { name: "Sugar",         symbol: "SB/USD",  value: "18.44",    change: "-2.15", pos: false, icon: "🍬", desc: "Soft commodity with seasonal demand cycles." },
  { name: "Coffee",        symbol: "KC/USD",  value: "192.30",   change: "+4.50", pos: true,  icon: "☕", desc: "Arabica coffee futures, globally traded." },
];

export default function ProductsPage() {
  return (
    <main className="dashboard-container fade-up">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Live commodity instruments available for algorithmic trading</p>
        </div>
        <div className="product-stats">
          <div className="stat-pill">
            <span className="stat-pill__dot stat-pill__dot--green" />
            {commodities.filter(c => c.pos).length} Gaining
          </div>
          <div className="stat-pill">
            <span className="stat-pill__dot stat-pill__dot--red" />
            {commodities.filter(c => !c.pos).length} Falling
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="product-grid">
        {commodities.map((c) => (
          <div key={c.symbol} className="product-card" id={`product-${c.symbol.replace("/","-")}`}>
            <div className="product-card__top">
              <span className="product-card__icon">{c.icon}</span>
              <span className={`product-card__change ${c.pos ? "pnl-positive" : "pnl-negative"}`}>
                {c.pos ? "▲" : "▼"} {c.change}%
              </span>
            </div>
            <h3 className="product-card__name">{c.name}</h3>
            <p className="product-card__symbol">{c.symbol}</p>
            <p className="product-card__value">${c.value}</p>
            <p className="product-card__desc">{c.desc}</p>
            <button className="btn-primary product-card__btn" id={`trade-${c.symbol.replace("/","-")}`}>
              Trade Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
