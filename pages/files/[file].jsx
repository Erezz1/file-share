import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AiOutlineFileText } from 'react-icons/ai';

import Custom404 from '../404';
import Layout from '../../layout';
import { getFile } from '../../client/getFiles';
import { SERVER_URL } from '../../utilities/url';

import downloadIcon from '../../public/assets/download_icon.svg';
import styles from '../../styles/file.module.css';

const File = ({ file }) => {

    const { original_name, downloads, password, name } = file;
    const router = useRouter();

    const [ passForm, setPassForm ] = useState('');
    const [ showDownload, setShowDownload ] = useState( false );

    useEffect(() => {
        if( !password ) {
            setShowDownload( true );
        }
    }, [ password ]);
    

    const handleSubmit = async event => {
        event.preventDefault();

        if ( password !== passForm ) {
            toast.error('La contraseña es incorrecta.');
            return;
        }

        setShowDownload( true );
    }

    const handleDownload = () => {
        router.push('/')
    }

    if ( name === '' ) {
        return (<Custom404 />);
    }

    return (
        <Layout>
            <form onSubmit={ handleSubmit } className={ styles.container }>
                <p className={ styles.file__title }>Tu descarga está lista!</p>

                <Image
                    src={ downloadIcon }
                    width={ 200 }
                    height={ 200 }
                    alt="Download"
                />

                <div className={ styles.file__details }>
                    <AiOutlineFileText />
                    <p>{ original_name }</p>
                </div>

                <p className={ styles.file__downloads }>Descargas disponibles: <span>{ downloads }</span></p>

                {
                    password && !showDownload && (<>
                        <input
                            type="password"
                            value={ passForm }
                            onChange={ event => setPassForm( event.target.value ) }
                            className={ styles.file__password }
                            placeholder="Contraseña"
                        />

                        <button
                            type="submit"
                            className={ styles.file__download }
                        >
                            Validar contraseña
                        </button>
                    </>)
                }

                {
                    showDownload && (
                        <a
                            href={`${ SERVER_URL }/api/files/download/${ name }`}
                            target='_blank'
                            rel='noreferrer'
                            className={ styles.file__download }
                            onClick={ handleDownload }
                        >
                            Descargar
                        </a>
                    )
                }
            </form>
        </Layout>
    )
}

// Genera las props de la página del archivo
export const getServerSideProps = async ({ params }) => {

    const { file } = params;

    const fileData = await getFile( file );

    return {
        props: {
            file: fileData
        }
    }
};

export default File;
