import { ToastContainer } from "react-toastify";
export default function ToastNotify() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

            className="flex flex-col gap-6"
            
        />
    )
}