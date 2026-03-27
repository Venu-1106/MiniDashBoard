// src/Skeleton.tsx

import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

// Single reusable skeleton block with shimmer animation
const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "6px",
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #1e1e2e 25%, #2a2a3d 50%, #1e1e2e 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
};

// Pre-built KPI card skeleton
export const KPICardSkeleton: React.FC = () => (
  <div
    style={{
      background: "#1e1e2e",
      border: "1px solid #2a2a3d",
      borderLeft: "4px solid #2a2a3d",
      borderRadius: "10px",
      padding: "20px 24px",
      flex: 1,
      minWidth: "180px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    <Skeleton width="60%" height="13px" />
    <Skeleton width="40%" height="28px" />
    <Skeleton width="70%" height="12px" />
  </div>
);

// Pre-built chart skeleton
export const ChartSkeleton: React.FC = () => (
  <div
    style={{
      background: "#1e1e2e",
      border: "1px solid #2a2a3d",
      borderRadius: "10px",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}
  >
    <Skeleton width="30%" height="16px" />
    <Skeleton width="100%" height="280px" borderRadius="8px" />
  </div>
);

// Add shimmer keyframes once globally
const style = document.createElement("style");
style.innerHTML = `
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;
document.head.appendChild(style);

export default Skeleton;