import { useEffect } from "react"
import type { ToastProps } from "../types/type"

const Toast = ({ message, type = "success", onClose }: ToastProps) => {
   
    
  useEffect(() => {    
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

if (!message){
      return
    }
    
  const typeClassMap: Record<string, string> = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  }


  const alertClass = typeClassMap[type] ?? "alert-success"

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${alertClass} text-white font-bold`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast
