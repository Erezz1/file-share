import { useRef, useEffect } from 'react';
import Image from 'next/image';

import Dropzone from '../components/Dropzone';
import img from '../public/assets/files_downing.svg'
import styles from '../styles/main.module.css';

const Sendfile = () => {

    const container = useRef( null );
    const width = typeof window !== 'undefined' ? window.innerWidth : null;

    useEffect(() => {
        const children = container.current.children;
        const image = children[ children.length - 1 ];

        if ( width >= 768 ) {
            image.style.position = 'absolute';
            image.style.bottom = '-8rem';
            image.style.right = '-8rem';
        }
    }, [ width ]);

    return (
        <div ref={ container } className={ styles.main__container }>
            <Dropzone />

            <div className={ styles.main__container_text }>
                <h2 className={ styles.main__container_h2 }>
                    Comparte archivos de forma segura y rápida!
                </h2>

                <p className={ styles.main__container_p }>
                    FileShare te permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
                </p>

            </div>

            <Image
                objectFit='fill'
                src={ img }
                alt="files_downing"
                width={ 500 }
                height={ 500 }
                priority
            />
        </div>
    )
}

export default Sendfile;
