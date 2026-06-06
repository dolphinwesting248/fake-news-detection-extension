import React from "react"

import { typeConfig } from "~src/constants/Colors"
import type { IndicatorProps } from "~src/types"

function Indicator({ type, message, show, onClose }: IndicatorProps) {
  const config = typeConfig[type]

  const styles = {
    container: {
      width: "100%",
      backgroundColor: config.bgColor,
      borderRadius: 8,
      padding: "12px 16px",
      marginBottom: 18,
      border: `1px solid ${config.borderColor}40`,
      boxSizing: "border-box" as const,
      position: "relative" as const,
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    },
    icon: {
      fontSize: 13,
      flexShrink: 0,
      lineHeight: 1.5,
      marginTop: 1,
      fontWeight: 700
    },
    message: {
      fontSize: 12,
      color: config.messageColor,
      lineHeight: 1.5,
      margin: 0,
      whiteSpace: "pre-wrap" as const,
      wordBreak: "break-word" as const,
      flex: 1,
      letterSpacing: "0.01em",
      fontWeight: 500
    },
    closeButton: {
      flexShrink: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      lineHeight: 1,
      color: config.messageColor,
      opacity: 0.45,
      padding: 0,
      width: 22,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      transition: "all 0.2s ease",
      marginTop: -1
    } as const
  }

  if (!show) return null

  return (
    <div style={styles.container}>
      <span style={styles.icon}>
        {type === "error"
          ? "✕"
          : type === "warning"
            ? "!"
            : type === "success"
              ? "✓"
              : "i"}
      </span>
      {message && <p style={styles.message}>{message}</p>}
      {onClose && (
        <button
          onClick={onClose}
          style={styles.closeButton}
          aria-label="关闭"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1"
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.45"
            e.currentTarget.style.backgroundColor = "transparent"
          }}>
          ×
        </button>
      )}
    </div>
  )
}

export default Indicator
