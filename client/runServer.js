import { SERVER_URL } from '../utilities/url';

export const runServer = async ( setIsLoading ) => {

    try {
        const res = await fetch(`${ SERVER_URL }/api/files`);
        const data = await res.json();

        if ( data.ok ) {
            return setIsLoading( false );
        }

    } catch ( error ) {
        console.log( error );
    }
}
