import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload, AiOutlineCloudDownload } from 'react-icons/ai';

import AppContext from '../context/appContext';
import FormFile from './FormFile';

import styles from '../styles/dropzone.module.css';

const Dropzone = () => {

    const { setFile, file } = useContext( AppContext )

    const onDropRejected = () => {
        console.log('No se pudo subir, el son 100MB.');
    }

    const onDropAccepted = useCallback( acceptedFiles => {
        const formData = new FormData();
        formData.append( 'archivo', acceptedFiles[0] );

        setFile( acceptedFiles[0] );
    }, [ setFile ]);

    const maxSize = 100000000;
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize });

    return (
        <>
        {
            file
                ? ( <FormFile file={ acceptedFiles[0] } /> )
                : (<div { ...getRootProps({ className: styles.dropzone__container }) }>
                    <input { ...getInputProps() } />

                    {
                        isDragActive
                        ? (<>
                            <AiOutlineCloudDownload className={ styles.dropzone__icon } />
                            <p className={ styles.dropzone__text }>Arrastra el archivo aquí</p>
                        </>)
                        : (<>
                            <AiOutlineCloudUpload className={ styles.dropzone__icon } />
                            <p className={ styles.dropzone__text }>
                                Arrastra y suelta un archivo
                                <span className={ styles.dropzone__text_span }>o haz click en el boton para enviar hasta 100MB</span>
                            </p>

                            <button className={ styles.dropzone__button }>
                                Seleccionar archivo
                            </button>
                        </>)
                    }
                </div>)
        }
        </>
    )
}

export default Dropzone;
