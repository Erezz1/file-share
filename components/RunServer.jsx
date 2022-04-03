import ClockLoader from 'react-spinners/ClockLoader';

import styles from '../styles/run-server.module.css';

const RunServer = () => {
    return (
        <div className={ styles.container }>
            <ClockLoader
                color="#45a1ff"
                loading={ true }
                size={ 200 }
            />
            <h3 className={ styles.title }>
                Encendiendo el servidor...
            </h3>
            <p className={ styles.text }>
                Por favor tenga paciencia, esto puede tardar unos minutos.
            </p>
        </div>
    )
}

export default RunServer;
