const { v4: uuidv4 } = require('uuid');

const saveFileInUploads = ( file, extension ) => {
    return new Promise( ( resolve, reject ) => {

        const id = uuidv4();

        const path = `${ __dirname }/../uploads/${ id }.${ extension }`;

        file.mv( path, ( err ) => {
            if ( err ) {
                return reject('Error al subir el archivo a la carpeta de "uploads"', err );
            }
            resolve( id );
        });
    });
}

module.exports = {
    saveFileInUploads
};
