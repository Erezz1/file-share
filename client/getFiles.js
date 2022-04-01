const SERVER_URL = 'http://localhost:8080';

// Obtiene el nombre de todos los archivos en el servidor
export const getLinksFiles = async () => {
    try {
        const res = await fetch(`${ SERVER_URL }/api/files`);
        const data = await res.json();

        if ( data.ok ) {
            return data.files;
        }

        return [];

    } catch ( error ) {
        console.log( error );
    }
}

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
