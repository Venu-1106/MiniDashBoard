import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { ChartSkeleton } from "./Skeleton";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"];

export const RegionPieChart: React.FC<{ data: any[]; loading: boolean }> = ({ data, loading }) => {
  if (loading) return <ChartSkeleton />;
  return (
    <div style={{ background: "#1e1e2e", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "20px" }}>
      <h3 style={{ color: "#f1f5f9", margin: "0 0 20px 0", fontSize: "16px" }}>🌐 Region Share</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="population" nameKey="region" cx="50%" cy="50%" outerRadius={100}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v: any) => `${(v / 1_000_000_000).toFixed(2)}B`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TopCountriesBarChart: React.FC<{ countries: any[]; loading: boolean; topN?: number }> = ({ countries, loading, topN = 10 }) => {
  if (loading) return <ChartSkeleton />;
  const data = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, topN)
    .map((c) => ({ name: c.name.common, population: c.population }));
  return (
    <div style={{ background: "#1e1e2e", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "20px" }}>
      <h3 style={{ color: "#f1f5f9", margin: "0 0 20px 0", fontSize: "16px" }}>🏆 Top {topN} Countries</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
          <XAxis type="number" tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(1)}B`} tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} width={80} />
          <Tooltip formatter={(v: any) => `${(v / 1_000_000_000).toFixed(2)}B`} />
          <Bar dataKey="population" fill="#f59e0b" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};