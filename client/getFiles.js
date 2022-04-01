import { SERVER_URL } from '../utilities/url';

// Obtiene los datos de un archivo en especifico
export const getFile = async ( file ) => {

    try {
        const res = await fetch(`${ SERVER_URL }/api/files/${ file }`);
        const data = await res.json();

        if ( data.ok ) {
            return data.file;
        }

        return {
            original_name: '',
            downloads: '',
            password: '',
            name: ''
        };

    } catch ( error ) {
        console.log( error );
    }
}
