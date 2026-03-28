// src/Chart.tsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  region: string;
  population: number;
}

interface ChartProps {
  data: ChartData[];
  title?: string;
}

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"];

// Custom tooltip that appears on hover
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          padding: "10px 14px",
          color: "#f1f5f9",
          fontSize: "13px",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        <div style={{ color: "#f59e0b" }}>
          Population: {payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({ data, title = "Population by Region" }) => {
  return (
    <div
      style={{
        background: "#1e1e2e",
        border: "1px solid #2a2a3d",
        borderRadius: "10px",
        padding: "20px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ color: "#f1f5f9", margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>
        📊 {title}
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
          <XAxis dataKey="region" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} />
          <YAxis
            tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(1)}B`}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="population" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;