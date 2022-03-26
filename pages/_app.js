import AppProvider from '../context/AppProvider';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
    return (
        <AppProvider>
            <Component {...pageProps} />
        </AppProvider>
    )
}

export default MyApp;
