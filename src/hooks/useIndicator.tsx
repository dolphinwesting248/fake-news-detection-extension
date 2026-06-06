import { useCallback, useState } from "react"
import Indicator from "~src/components/Indicator"

function useIndicator() {
  const [type, setType] = useState<"warning" | "success" | "error" | "info">(
    "info"
  )
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)

  const showMessage = useCallback(
    (message: string, type: "warning" | "success" | "error" | "info") => {
      setMessage(message)
      setType(type)
      setShow(true)
    },
    []
  )

  const hideMessage = useCallback(() => {
    setShow(false)
  }, [])

  const IndicatorComponent = () => {
    if (!show) return null

    return (
      <Indicator
        type={type}
        message={message}
        show={show}
        onClose={hideMessage}
      />
    )
  }

  return { showMessage, Indicator: IndicatorComponent }
}

export default useIndicator
