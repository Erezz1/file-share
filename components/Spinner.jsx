import SpinnerLoading  from 'react-spinners/ClockLoader';

import styles from '../styles/spinner.module.css';

const Spinner = ({ message }) => {

    return (
        <div className={ styles.container }>
            <SpinnerLoading 
                color="#45a1ff"
                loading={ true }
                size={ 100 }
            />
            <p className={ styles.spinner__text }>{ message }</p>
        </div>
    )
}

export default Spinner
