import styles from '../styles/footer.module.css';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className={ styles.footer__container }>
            Erez Web | { year } &copy;
        </footer>
    )
}

export default Footer;