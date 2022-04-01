import Head from 'next/head';

import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>FileShare</title>
            </Head>

            <div className={ styles.layout__container }>
                <Header />

                <div className={ styles.layout__wrapper }>
                { children }
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Layout;