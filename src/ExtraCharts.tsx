// src/ExtraCharts.tsx
// ─────────────────────────────────────────────────────────────
// Unique addition: Animated Pie Chart (region share) +
//                 Horizontal Bar Race (top 10 countries)
// Both use Recharts, match the existing dark theme, and include:
//   • Fade-in on mount via IntersectionObserver (no layout shift)
//   • Smooth activeShape expansion on the pie slices
//   • Custom animated tooltip
//   • Skeleton-compatible (accepts `loading` prop)
// ─────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";
import type { Country } from "./api/countryApi";

// ── Palette (matches existing dashboard accent colours) ──────
const PALETTE = [
  "#f59e0b", // amber
  "#3b82f6", // blue
  "#10b981", // emerald
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
  "#ec4899", // pink
];

// ── Shared card wrapper ───────────────────────────────────────
const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  fadeIn?: boolean;
}> = ({ children, style, fadeIn }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fadeIn) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fadeIn]);

  return (
    <div
      ref={ref}
      style={{
        background: "#1e1e2e",
        border: "1px solid #2a2a3d",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ChartTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      color: "#f1f5f9",
      margin: "0 0 20px 0",
      fontSize: "15px",
      fontWeight: 600,
      letterSpacing: "0.01em",
    }}
  >
    {children}
  </h3>
);

// ── Skeleton bar ──────────────────────────────────────────────
const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg,#1e1e2e 25%,#2a2a3d 50%,#1e1e2e 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: "6px",
};

// ════════════════════════════════════════════════════════════
// 1. ANIMATED PIE CHART  (Region Population Share)
// ════════════════════════════════════════════════════════════

interface RegionDatum {
  region: string;
  population: number;
}

// Active (expanded) slice shape
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent,
  } = props;

  return (
    <g>
      {/* Expanded slice */}
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 8px ${fill}88)`, transition: "all 0.3s ease" }}
      />
      {/* Centre label */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#f1f5f9" fontSize={14} fontWeight={700}>
        {payload.region}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize={12}>
        {(percent * 100).toFixed(1)}%
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="#6b7280" fontSize={11}>
        {(payload.population / 1_000_000_000).toFixed(2)}B
      </text>
    </g>
  );
};

export const RegionPieChart: React.FC<{
  data: RegionDatum[];
  loading?: boolean;
}> = ({ data, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onEnter = useCallback((_: any, index: number) => setActiveIndex(index), []);

  if (loading) {
    return (
      <Card>
        <div style={{ ...shimmerStyle, width: "40%", height: "15px", marginBottom: 20 }} />
        <div
          style={{
            ...shimmerStyle,
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
      </Card>
    );
  }

  return (
    <Card fadeIn>
      <ChartTitle>🥧 Region Population Share</ChartTitle>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={110}
            dataKey="population"
            nameKey="region"
            onMouseEnter={onEnter}
            isAnimationActive
            animationBegin={0}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 20px",
          marginTop: "8px",
          justifyContent: "center",
        }}
      >
        {data.map((d, i) => (
          <div
            key={d.region}
            style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: PALETTE[i % PALETTE.length],
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{d.region}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ════════════════════════════════════════════════════════════
// 2. HORIZONTAL BAR CHART  (Top 10 Countries)
// ════════════════════════════════════════════════════════════

interface CountryDatum {
  name: string;
  population: number;
  color: string;
}

// Custom animated tooltip
const TopTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#12121f",
        border: `1px solid ${payload[0]?.fill ?? "#f59e0b"}`,
        borderRadius: "8px",
        padding: "9px 14px",
        color: "#f1f5f9",
        fontSize: "13px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ color: payload[0]?.fill }}>
        {(payload[0]?.value / 1_000_000_000).toFixed(3)}B people
      </div>
    </div>
  );
};

export const TopCountriesBarChart: React.FC<{
  countries: Country[];
  loading?: boolean;
  topN?: number;
}> = ({ countries, loading, topN = 10 }) => {
  const data: CountryDatum[] = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, topN)
    .map((c, i) => ({
      name: c.name.common,
      population: c.population,
      color: PALETTE[i % PALETTE.length],
    }));

  if (loading) {
    return (
      <Card>
        <div style={{ ...shimmerStyle, width: "50%", height: "15px", marginBottom: 20 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ ...shimmerStyle, width: 70, height: 12 }} />
              <div style={{ ...shimmerStyle, flex: 1, height: 22 }} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card fadeIn style={{ marginTop: 0 }}>
      <ChartTitle>🏆 Top {topN} Most Populous Countries</ChartTitle>

      <ResponsiveContainer width="100%" height={topN * 42}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" horizontal={false} />
          <XAxis
            type="number"
            hide
            domain={[0, (max: number) => max * 1.12]}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<TopTooltip />} cursor={{ fill: "#ffffff08" }} />
          <Bar
            dataKey="population"
            radius={[0, 6, 6, 0]}
            isAnimationActive
            animationBegin={120}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            {/* Inline value label */}
            <LabelList
              dataKey="population"
              position="right"
              formatter={(v: number) =>
                v >= 1_000_000_000
                  ? `${(v / 1_000_000_000).toFixed(2)}B`
                  : `${(v / 1_000_000).toFixed(0)}M`
              }
              style={{ fill: "#6b7280", fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};