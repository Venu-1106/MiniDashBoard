import KPICard from "./KPICard";


function App() {
  return (
    <div style={{ background: "#0f0f1a", minHeight: "100vh", padding: "32px" }}>
      <h1 style={{ color: "#f59e0b", marginBottom: "24px" }}>🧪 KPICard Test</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <KPICard
          title="Total Countries"
          value={250}
          icon="🏳️"
          subtitle="Recognised worldwide"
          accent="#f59e0b"
        />
        <KPICard
          title="Total Population"
          value="8.00B"
          icon="👥"
          subtitle="Combined global population"
          accent="#3b82f6"
        />
        <KPICard
          title="Regions"
          value={6}
          icon="🗺️"
          subtitle="Africa, Asia, Europe..."
          accent="#10b981"
        />
      </div>
    </div>
  );
}

export default App;
