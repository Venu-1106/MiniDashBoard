import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  accent?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  subtitle,
  accent = "#f59e0b",
}) => {
  return (
    <div
      style={{
        background: "#1e1e2e",
        border: "1px solid #2a2a3d",
        borderLeft: `4px solid ${accent}`, // ✅ FIXED
        borderRadius: "10px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minWidth: "180px",
        flex: 1,
        transition: "transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-3px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: "22px" }}>{icon}</span>
      </div>

      <div style={{ fontSize: "28px", fontWeight: 700, color: "#f1f5f9" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>

      {subtitle && (
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default KPICard;