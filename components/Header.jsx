import Image from 'next/image';
import logo from '../public/assets/logo.png';
import styles from '../styles/header.module.css';

const Header = () => {
    return (
        <header className={ styles.header__container }>
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
        </header>
    )
}

export default Header;
