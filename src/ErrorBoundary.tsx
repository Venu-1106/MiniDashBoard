// src/ErrorBoundary.tsx

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // optional custom fallback UI
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  // Called when a child component throws
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  // Log the error (you can send this to a logging service)
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback was passed, show that instead
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            background: "#1e1e2e",
            border: "1px solid #ef4444",
            borderRadius: "10px",
            padding: "32px",
            textAlign: "center",
            color: "#f1f5f9",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚠️</div>
          <h3 style={{ color: "#ef4444", marginBottom: "8px" }}>Something went wrong</h3>
          <p style={{ color: "#9ca3af", fontSize: "13px", marginBottom: "20px" }}>
            {this.state.errorMessage || "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              background: "#f59e0b",
              color: "#0f0f1a",
              border: "none",
              borderRadius: "6px",
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;