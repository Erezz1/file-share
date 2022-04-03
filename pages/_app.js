import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import AppProvider from '../context/AppProvider';
import RunServer from '../components/RunServer';
import { runServer } from '../client/runServer';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {

    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {
        runServer( setIsLoading );
    }, [])

    if ( isLoading ) {
        return <RunServer />
    }

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
