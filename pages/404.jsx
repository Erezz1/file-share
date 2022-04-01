import Layout from '../layout';

import styles from '../styles/404.module.css';

const Custom404 = () => {

    return (
        <Layout>
            <div className={ styles.container }>
                <h1 className={ styles.custom404__title }>404</h1>
                <p className={ styles.custom404__text }>Página no encontrada</p>
            </div>
        </Layout>
    )
}

export default Custom404;
