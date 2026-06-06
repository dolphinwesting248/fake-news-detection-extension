import { useCallback, useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import useIndicator from "~src/hooks/useIndicator"

import { newsColor } from "./constants/Colors"
import sendQuery from "./utils/sendQuery"

function IndexPopup() {
  const sessionStore = new Storage({ area: "session" })

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [typeColor, setTypeColor] = useState("#9ca3af")
  const [isLoading, setIsLoading] = useState(false)

  const { showMessage, Indicator } = useIndicator()

  useEffect(() => {
    const loadData = async () => {
      const [savedTitle, savedContent] = await Promise.all([
        sessionStore.get("title"),
        sessionStore.get("content")
      ])
      if (savedTitle) setTitle(savedTitle)
      if (savedContent) setContent(savedContent)
    }
    loadData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== undefined) sessionStore.set("title", title)
    }, 500)
    return () => clearTimeout(timer)
  }, [title])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content !== undefined) sessionStore.set("content", content)
    }, 500)
    return () => clearTimeout(timer)
  }, [content])

  useEffect(() => {
    const colorMap: Record<string, string> = newsColor
    setTypeColor(colorMap[type] || "#9ca3af")
  }, [type])

  const clear = useCallback(async () => {
    setTitle("")
    setContent("")
    await Promise.all([
      sessionStore.set("title", ""),
      sessionStore.set("content", "")
    ])
  }, [])

  const sendNews = useCallback(async () => {
    if (!content.trim()) {
      showMessage("新闻内容不能为空", "warning")
      return
    }

    setIsLoading(true)
    try {
      const res = await sendQuery(content, title)
      setType(res.label)
    } catch (err) {
      showMessage(err.message, "error")
    } finally {
      setIsLoading(false)
      clear()
    }
  }, [content, title, showMessage])

  const styles = {
    container: {
      width: 420,
      padding: 0,
      fontFamily:
        '"JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", monospace',
      backgroundColor: "#fcfaf7",
      color: "#2d2f38",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow:
        "0 0 0 1px rgba(0, 0, 0, 0.04), 0 4px 32px rgba(0, 0, 0, 0.08)"
    },
    header: {
      padding: "24px 28px 20px",
      borderBottom: "1px solid #e8e4dc",
      position: "relative" as const,
      background: "linear-gradient(180deg, #ffffff 0%, #fcfaf7 100%)"
    },
    headerAccent: {
      position: "absolute" as const,
      bottom: -1,
      left: 28,
      width: 48,
      height: 2,
      background: "linear-gradient(90deg, #1a56f0, #5b8af7, transparent)",
      borderRadius: 1
    },
    heading: {
      fontFamily: '"DM Serif Display", "Georgia", "Times New Roman", serif',
      fontSize: 22,
      fontWeight: 400,
      color: "#1a1d28",
      margin: 0,
      letterSpacing: "0.02em",
      lineHeight: 1.2
    },
    headingSub: {
      display: "block",
      fontSize: 10,
      fontWeight: 500,
      color: "#9a9ca8",
      marginTop: 3,
      fontFamily:
        '"JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", monospace',
      textTransform: "uppercase" as const,
      letterSpacing: "0.14em"
    },
    body: {
      padding: "24px 28px 28px"
    },
    inputGroup: {
      marginBottom: 18
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 11,
      fontWeight: 600,
      marginBottom: 8,
      color: "#6b6d78",
      textTransform: "uppercase" as const,
      letterSpacing: "0.08em"
    },
    labelDot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      backgroundColor: "#1a56f0",
      display: "inline-block"
    },
    input: {
      width: "100%",
      padding: "11px 16px",
      fontSize: 13,
      color: "#2d2f38",
      border: "1.5px solid #e4e0d8",
      borderRadius: 10,
      outline: "none",
      boxSizing: "border-box" as const,
      transition: "all 0.25s ease",
      backgroundColor: "#ffffff",
      fontFamily: "inherit",
      letterSpacing: "0.01em",
      lineHeight: 1.5
    },
    textarea: {
      width: "100%",
      padding: "11px 16px",
      fontSize: 13,
      color: "#2d2f38",
      border: "1.5px solid #e4e0d8",
      borderRadius: 10,
      outline: "none",
      fontFamily: "inherit",
      resize: "vertical" as const,
      minHeight: 110,
      boxSizing: "border-box" as const,
      transition: "all 0.25s ease",
      backgroundColor: "#ffffff",
      letterSpacing: "0.01em",
      lineHeight: 1.6
    },
    resultArea: {
      backgroundColor: "#ffffff",
      borderRadius: 10,
      padding: "16px 20px",
      marginBottom: 24,
      border: "1px solid #e8e4dc",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)"
    },
    resultLabel: {
      fontSize: 11,
      fontWeight: 600,
      color: "#6b6d78",
      textTransform: "uppercase" as const,
      letterSpacing: "0.08em"
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 14px",
      borderRadius: 6,
      backgroundColor: `${typeColor}14`,
      color: typeColor,
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: "0.03em",
      border: `1px solid ${typeColor}30`,
      textTransform: "uppercase" as const
    },
    badgeDot: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      backgroundColor: typeColor,
      display: "inline-block"
    },
    idleBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 14px",
      borderRadius: 6,
      backgroundColor: "#f5f3ef",
      color: "#b0b2bc",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: "0.03em",
      border: "1px solid #e8e4dc",
      textTransform: "uppercase" as const
    },
    buttonGroup: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end"
    },
    button: {
      padding: "10px 22px",
      fontSize: 12,
      fontWeight: 600,
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      letterSpacing: "0.03em",
      textTransform: "uppercase" as const
    },
    sendButton: {
      backgroundColor: "#1a56f0",
      color: "#ffffff",
      boxShadow: "0 2px 8px rgba(26, 86, 240, 0.2)"
    },
    clearButton: {
      backgroundColor: "transparent",
      color: "#8b8d98",
      border: "1.5px solid #e4e0d8"
    },
    loadingWrap: {
      display: "flex",
      alignItems: "center",
      gap: 8
    },
    loadingText: {
      fontSize: 12,
      color: "#8b8d98",
      letterSpacing: "0.03em"
    },
    scanBar: {
      width: 60,
      height: 2,
      backgroundColor: "#e8e4dc",
      borderRadius: 1,
      overflow: "hidden",
      position: "relative" as const
    }
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

          @keyframes scanSlide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }

          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .news-input:focus, .news-textarea:focus {
            border-color: #1a56f0 !important;
            box-shadow: 0 0 0 3px rgba(26, 86, 240, 0.08);
            background-color: #fdfdfc !important;
          }

          .news-input::placeholder, .news-textarea::placeholder {
            color: #bfbeb6;
          }

          .send-btn:hover {
            background-color: #1450db !important;
            box-shadow: 0 4px 16px rgba(26, 86, 240, 0.3) !important;
            transform: translateY(-1px);
          }

          .send-btn:active {
            transform: scale(0.97) !important;
            background-color: #0f40b8 !important;
          }

          .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            box-shadow: none !important;
          }

          .clear-btn:hover {
            background-color: #f5f3ef !important;
            border-color: #ccc8be !important;
            color: #5b5d68 !important;
          }

          .clear-btn:active {
            transform: scale(0.97);
          }

          .result-badge-enter {
            animation: fadeSlideIn 0.35s ease-out;
          }

          .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 40%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(26, 86, 240, 0.5), transparent);
            animation: scanSlide 1.4s ease-in-out infinite;
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={styles.heading}>
          Fake News Detector
        </h1>
        <div style={styles.headerAccent} />
      </div>

      <div style={styles.body}>
        <Indicator />

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelDot} />
            新闻标题
          </label>
          <input
            type="text"
            className="news-input"
            placeholder="请粘贴或输入新闻标题..."
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              sessionStore.set("title", title)
            }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelDot} />
            新闻内容
          </label>
          <textarea
            className="news-textarea"
            placeholder="请粘贴或输入新闻正文内容..."
            style={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => {
              sessionStore.set("content", content)
            }}
          />
        </div>

        <div style={styles.resultArea}>
          <span style={styles.resultLabel}>检测结果</span>
          {isLoading ? (
            <div style={styles.loadingWrap}>
              <span style={styles.loadingText}>分析中</span>
              <div style={styles.scanBar}>
                <div className="scan-line" />
              </div>
            </div>
          ) : type ? (
            <span className="result-badge-enter" style={styles.badge}>
              <span style={styles.badgeDot} />
              {type}
            </span>
          ) : (
            <span style={styles.idleBadge}>等待分析</span>
          )}
        </div>

        <div style={styles.buttonGroup}>
          <button
            className="clear-btn"
            style={{ ...styles.button, ...styles.clearButton }}
            onClick={clear}>
            清除
          </button>
          <button
            className="send-btn"
            onClick={sendNews}
            disabled={isLoading}
            style={{
              ...styles.button,
              ...styles.sendButton,
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}>
            {isLoading ? "分析中..." : "发送"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
