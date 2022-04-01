import { ToastContainer } from 'react-toastify';

import AppProvider from '../context/AppProvider';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {

    return (
        <AppProvider>
            <Component {...pageProps} />
            <ToastContainer
                position="bottom-center"
                autoClose={ 5000 }
                hideProgressBar={ false }
                closeOnClick
                draggable
                pauseOnHover
            />
        </AppProvider>
    )
}

export default MyApp;
