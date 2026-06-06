export interface IndicatorProps {
  type?: "warning" | "success" | "error" | "info"
  message?: string
  show?: boolean
  onClose?: () => void 
}
