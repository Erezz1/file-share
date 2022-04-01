import { SERVER_URL } from '../utilities/url';

export const uploadFile = async ( file ) => {

    try {
        const res = await fetch(`${ SERVER_URL }/api/files/upload`, {
            method: 'POST',
            body: file
        });
        const data = await res.json();

        if ( data.ok ) {
            return data.path;
        }

        return null;

    } catch ( error ) {
        console.log( error );
    }
}

export const updateDataFile = async ( details, path ) => {

    try {
        const res = await fetch(`${ SERVER_URL }/api/files/${ path }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( details )
        });
        const data = await res.json();

        if ( data.ok ) {
            return data.path;
        }

        return null;

    } catch ( error ) {
        console.log( error );
    }
}
