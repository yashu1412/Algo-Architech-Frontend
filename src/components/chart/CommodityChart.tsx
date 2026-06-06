"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import { useCommodities } from "@/hooks/useCommodities";
import FilterButtons from "./FilterButtons";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Interval = "daily" | "monthly" | "yearly";

/** -----------------------------------------------------------------------
 *  Data helpers
 *  Alpha Vantage ALL_COMMODITIES always returns monthly points.
 *  We slice / aggregate client-side to emulate the three views.
 * --------------------------------------------------------------------- */

interface DataPoint { x: number; y: number; }

function toPoints(raw: any[]): DataPoint[] {
  return raw
    .filter((d) => d.value !== "." && !isNaN(parseFloat(d.value)))
    .map((d) => ({ x: new Date(d.date).getTime(), y: parseFloat(d.value) }))
    .sort((a, b) => a.x - b.x); // chronological order
}

function applyInterval(points: DataPoint[], interval: Interval): DataPoint[] {
  if (interval === "daily") {
    // Last 30 monthly data-points → labelled as "daily" view
    return points.slice(-30);
  }
  if (interval === "yearly") {
    // One data-point per calendar year (last reading of each year)
    const byYear = new Map<number, DataPoint>();
    for (const p of points) {
      const yr = new Date(p.x).getFullYear();
      byYear.set(yr, p); // later values in the same year overwrite earlier
    }
    return Array.from(byYear.values()).sort((a, b) => a.x - b.x);
  }
  // monthly — return all
  return points;
}

function xLabelFormat(interval: Interval): string {
  if (interval === "daily") return "MMM dd, yyyy";
  if (interval === "yearly") return "yyyy";
  return "MMM yyyy";
}

function tooltipXFormat(interval: Interval): string {
  if (interval === "daily") return "MMM dd, yyyy";
  if (interval === "yearly") return "yyyy";
  return "MMM yyyy";
}

/** ----------------------------------------------------------------------- */

export default function CommodityChart() {
  const [mounted, setMounted] = useState(false);
  const [interval, setInterval] = useState<Interval>("monthly");

  // Always fetch monthly — we process client-side
  const { data, isLoading, isError } = useCommodities("monthly");

  useEffect(() => { setMounted(true); }, []);

  // Derived series — recalculated whenever raw data or interval changes
  const series = useMemo(() => {
    const raw: any[] = data?.data ?? [];
    const all = toPoints(raw);
    const filtered = applyInterval(all, interval);
    return [{ name: "Price Index", data: filtered }];
  }, [data, interval]);

  if (!mounted) {
    return (
      <div className="chart-card" style={{ minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      animations: { enabled: false }, // prevents runMaskReveal crash on remount
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#26C6DA"],
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        colorStops: [
          { offset: 0, color: "rgba(38,198,218,0.55)", opacity: 1 },
          { offset: 100, color: "rgba(38,198,218,0.02)", opacity: 1 },
        ],
      },
    },
    colors: ["#26C6DA"],
    xaxis: {
      type: "datetime",
      axisBorder: { show: false },
      axisTicks: { show: true, color: "rgba(0,0,0,0.1)" },
      tickAmount: interval === "daily" ? 30 : interval === "yearly" ? 30 : 20,
      labels: {
        style: { colors: "#9E9E9E", fontSize: "10px", fontWeight: "400" },
        format: xLabelFormat(interval),
        rotate: -30,
        rotateAlways: false,
        hideOverlappingLabels: true,
        datetimeUTC: false,
      },
    },
    yaxis: {
      tickAmount: 6,
      labels: {
        style: { colors: "#9E9E9E", fontSize: "11px", fontWeight: "400" },
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(0,0,0,0.07)",
      strokeDashArray: 0,
      position: "back",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      x: { format: tooltipXFormat(interval) },
      theme: "light",
      style: { fontSize: "12px", fontFamily: "'Inter', sans-serif" },
      y: { formatter: (val: number) => val.toFixed(2) },
    },
    markers: {
      size: [0],
      hover: { size: 6 },
      colors: ["#26C6DA"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
  };

  /* Point count label shown next to filter buttons */
  const pointCount = series[0]?.data?.length ?? 0;
  const rangeLabel: Record<Interval, string> = {
    daily: "Last 30 months",
    monthly: "All monthly data",
    yearly: "Annual averages",
  };

  return (
    <div className="chart-card fade-up">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
            Commodity Price Index
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            {rangeLabel[interval]} · {pointCount} data point{pointCount !== 1 ? "s" : ""}
          </p>
        </div>
        <FilterButtons active={interval} onChange={setInterval} />
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        {isLoading ? (
          <div style={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="spinner" />
          </div>
        ) : isError ? (
          <div style={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--status-danger)", fontWeight: 500 }}>
            Error loading chart data
          </div>
        ) : (
          <ApexChart
            key={interval}          /* force remount on filter change */
            type="area"
            series={series}
            options={options}
            height={350}
          />
        )}
      </div>

      {/* Description */}
      <div className="description-section">
        <h4>Description</h4>
        <p>
          The above chart displays the global price index of all commodities.
          Switch between <strong>Daily</strong> (last 30 readings),{" "}
          <strong>Monthly</strong> (full history), or{" "}
          <strong>Yearly</strong> (one point per year) to analyse different
          temporal perspectives of macro-economic commodity trends.
        </p>
      </div>
    </div>
  );
}
