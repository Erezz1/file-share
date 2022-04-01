import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineFileText, AiFillLock } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { updateDataFile, uploadFile } from '../client/formControl';

import Spinner from './Spinner';
import AppContext from '../context/AppContext';
import { formatBytes } from '../helpers/formatBytes';

import styles from '../styles/dropzone.module.css';

const FormFile = () => {

    const router = useRouter();

    const { file, clearFile, formData, setLink } = useContext( AppContext )
    const { name } = file;
    const size = formatBytes( file.size );

    const [ addPassword, setAddPassword ] = useState( false );
    const [ password, setPassword ] = useState('');
    const [ downloads, setDownloads ] = useState(1);
    const [ loading, setLoading ] = useState( false );

    useEffect(() => {
        setPassword('');
    }, [ addPassword ])


    const handleSubmit = async event => {
        event.preventDefault();
        setLoading( true );

        const path = await uploadFile( formData );
        await updateDataFile({ password, downloads }, path );

        setLink( path );
        router.push(`/link`);
    }

    const handleCancelFile = () => { clearFile(); }
    const handleChangePassword = event => { setPassword( event.target.value ); }
    const handleChangeDownloads = event => { setDownloads( event.target.value ); }

    if ( loading ) {
        return <Spinner message="Subiendo archivos" />
    }

    return (
        <form onSubmit={ handleSubmit } className={ styles.dropzone__fileadded }>
            <div className={ styles.dropzone__file }>
                <AiOutlineFileText />
                <div className={ styles.dropzone__file_text }>
                    <p>{ name }</p>
                    <p style={{ fontSize: '1rem', fontWeight: '100' }}>{ size }</p>
                </div>
                <GiCancel onClick={ handleCancelFile } className={ styles.dropzone__file_cancel } />
            </div>

            <div className={ styles.dropzone__limit_downloads }>
                Límite de descargas:
                <select
                    value={ downloads }
                    onChange={ handleChangeDownloads }
                    className={ styles.dropzone__limit_select }
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className={ styles.dropzone__password_container }>
                <label className={ styles.dropzone__password } htmlFor="password">
                    <input
                        type="checkbox"
                        id="password"
                        checked={ addPassword }
                        onChange={ () => setAddPassword( prev => !prev ) }
                    />
                    Proteger con contraseña
                    <span className={ styles.dropzone__checked }>
                        { addPassword && <AiFillLock fontSize={20} /> }
                    </span>
                </label>

                {
                    addPassword && <input
                        style={{ margin: 0 }}
                        className={ styles.dropzone__limit_select }
                        placeholder="Contraseña"
                        type="password"
                        value={ password }
                        onChange={ handleChangePassword }
                        autoComplete="off"
                    />
                }
            </div>

            <p className={ styles.dropzone__limit_downloads }>Recuerda que el archivo tiene una duración máxima de 24 horas.</p>

            <button className={ styles.dropzone__button } type="submit">
                Subir
            </button>
        </form>
    )
}

export default FormFile