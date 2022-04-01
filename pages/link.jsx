import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BiCopyAlt } from 'react-icons/bi';
import { GiConfirmed } from 'react-icons/gi';

import AppContext from '../context/appContext';
import Layout from '../layout';

import styles from '../styles/link.module.css';

const CLIENT_URL = 'http://localhost:3000';

const Link = () => {

    const { link } = useContext( AppContext );
    const [ copied, setCopied ] = useState( false );
    const router = useRouter();

    useEffect(() => {
        if( !link ) { router.push('/') };
    }, [ link, router ]);

    const handleCopyLink = () => {
        const linkText = `${ CLIENT_URL }/files/${ link }`;
        navigator.clipboard.writeText( linkText );
        setCopied( true );
    }

    return (
        <Layout>
            <div className={ styles.container }>
                <h3 className={ styles.link__title }>¡Comparte tu archivo con este link!</h3>

                <p
                    onClick={ handleCopyLink }
                    className={ styles.link__text }
                >{ CLIENT_URL }/files/{ link }</p>

                <button
                    onClick={ handleCopyLink }
                    className={ styles.link__button }
                >
                    {
                        copied
                        ? (<>Copiado<GiConfirmed /></>)
                        : (<>Copiar link<BiCopyAlt /></>)
                    }
                </button>
            </div>
        </Layout>
    )
}

export default Link