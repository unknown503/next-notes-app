import { ToastContainer, Flip } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';

export const DefaultToast = () => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            transition={Flip}
            limit={3}
        />
    )
}
