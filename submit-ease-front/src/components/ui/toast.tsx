import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: string
  onClose: () => void;
};

const Toast = ({message,type, onClose} : ToastProps) => {
     useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert alert-${type ? type : 'success'} text-white font-bold`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
