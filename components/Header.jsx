import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AppContext from '../context/AppContext';

import logo from '../public/assets/logo.png';
import styles from '../styles/header.module.css';

const Header = () => {

    const router = useRouter();
    const { clearFile } = useContext( AppContext )

    const handleReturn = () => {
        clearFile();
        router.push('/')
    };

    return (
        <header className={ styles.header__container }>
            <button
                className={ styles.header__button }
                onClick={ handleReturn }
            >
                <Image
                    src={ logo }
                    alt="logo"
                    width={ 40 }
                    height={ 40 }
                />

                <h1 className={ styles.header__title }>
                    File
                    <span className={ styles.header__title_span }>Share</span>
                </h1>
            </button>
        </header>
    )
}

export default Header;
