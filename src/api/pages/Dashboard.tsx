// src/api/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import {
  fetchAllCountries,
  getPopulationByRegion,
  getTopCountries,
  type Country,
} from "../countryApi";
import KPICard from "../../KPICard";
import Chart from "../../Chart";
import ErrorBoundary from "../../ErrorBoundary";
import { KPICardSkeleton, ChartSkeleton } from "../../Skeleton";

const Dashboard: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const regionData = getPopulationByRegion(countries);
  const topCountry = getTopCountries(countries, 1)[0];
  const uniqueRegions = [...new Set(countries.map((c) => c.region))].filter(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        color: "#f1f5f9",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "32px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#f59e0b", margin: 0 }}>
          🌍 World Countries Dashboard
        </h1>
        <p style={{ color: "#6b7280", margin: "4px 0 0 0", fontSize: "14px" }}>
          Live data from REST Countries API
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div
          style={{
            background: "#1e1e2e",
            border: "1px solid #ef4444",
            borderRadius: "10px",
            padding: "20px",
            color: "#ef4444",
            marginBottom: "24px",
          }}
        >
          ❌ Failed to load data: {error}
        </div>
      )}

      {/* KPI Cards Row */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        {loading ? (
          <>
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
          </>
        ) : (
          <>
            <KPICard
              title="Total Countries"
              value={countries.length}
              icon="🏳️"
              subtitle="Recognised worldwide"
              accent="#f59e0b"
            />
            <KPICard
              title="Total Population"
              value={`${(totalPopulation / 1_000_000_000).toFixed(2)}B`}
              icon="👥"
              subtitle="Combined global population"
              accent="#3b82f6"
            />
            <KPICard
              title="Regions"
              value={uniqueRegions.length}
              icon="🗺️"
              subtitle={uniqueRegions.join(", ")}
              accent="#10b981"
            />
            <KPICard
              title="Most Populous"
              value={topCountry?.name.common ?? "—"}
              icon="📈"
              subtitle={topCountry ? `${(topCountry.population / 1_000_000_000).toFixed(2)}B people` : ""}
              accent="#ef4444"
            />
          </>
        )}
      </div>

      {/* Chart */}
      <ErrorBoundary>
        {loading ? (
          <ChartSkeleton />
        ) : (
          <Chart data={regionData} title="Population by Region" />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Dashboard;