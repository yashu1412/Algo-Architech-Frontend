"use client";

type Interval = "daily" | "monthly" | "yearly";

const opts: Interval[] = ["daily", "monthly", "yearly"];

export default function FilterButtons({
  active,
  onChange,
}: {
  active: Interval;
  onChange: (v: Interval) => void;
}) {
  return (
    <div className="filter-group">
      {opts.map((o) => (
        <button
          key={o}
          id={`filter-btn-${o}`}
          onClick={() => onChange(o)}
          className={`filter-btn${active === o ? " filter-btn--active" : ""}`}
        >
          {o.charAt(0).toUpperCase() + o.slice(1)}
        </button>
      ))}
    </div>
  );
}
