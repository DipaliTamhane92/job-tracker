import { useEffect } from "react"
import "../../styles/toast.css"

interface ToastProp {
    message: string;
    show: boolean;
    onClose: () => void;
}

const Toast = ({ message, show, onClose}: ToastProp) => {
    useEffect(() => {
        if(show){
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if(!show) return null;

    return <div className="toast"> { message } </div>;
}

export default Toast;