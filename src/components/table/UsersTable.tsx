"use client";

const brokers = [
  {
    name: "Zerodha (DU000004)",
    positions: 1,
    capital: "₹ 1.54 Cr",
    strategies: 3,
    active: 1,
    status: "Active",
    pnl: "₹ 50.02 K",
    pnlRaw: 50.02,
    req: "₹ 50.02 K",
  },
  {
    name: "Angel One (MNBN1026)",
    positions: 2,
    capital: "₹ 2.50 K",
    strategies: 2,
    active: 2,
    status: "Active",
    pnl: "₹ 60.02 K",
    pnlRaw: 60.02,
    req: "₹ 60.02 K",
  },
  {
    name: "Finvasia (FA189009)",
    positions: 0,
    capital: "₹ 50.02 K",
    strategies: 0,
    active: 0,
    status: "Pending",
    pnl: "₹ -12.50 K",
    pnlRaw: -12.5,
    req: "₹ 0.00",
  },
];

const columns = [
  "Broker",
  "Active Positions",
  "Available Capital",
  "Total Strategies",
  "Active Strategies",
  "Status",
  "Current P&L",
  "Required Capital",
];

export default function UsersTable() {
  return (
    <div className="table-card fade-up">
      <h2 className="table-card__title">Users</h2>

      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {brokers.map((b) => (
              <tr key={b.name}>
                <td className="broker-name">{b.name}</td>
                <td>{b.positions}</td>
                <td>{b.capital}</td>
                <td>{b.strategies}</td>
                <td style={{ textAlign: "center" }}>{b.active}</td>
                <td>
                  <span className={b.status === "Active" ? "status-active" : "status-pending"}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <span className={b.pnlRaw >= 0 ? "pnl-positive" : "pnl-negative"}>
                    {b.pnl}
                  </span>
                </td>
                <td className="broker-name">{b.req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
