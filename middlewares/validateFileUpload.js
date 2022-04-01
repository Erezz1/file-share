// Valida que el archivo exista en la peticion
const validateExistFile = ( req, res, next ) => {

    const { files } = req;

    if ( !files ) {
        return res.status( 400 ).json({
            ok: false,
            message: 'No se encuentra ningún archivo',
        });
    }

    const { file } = files;
    if ( !file ) {
        return res.status( 400 ).json({
            ok: false,
            message: 'No se encuentra ningún archivo',
        });
    }

    next();
}

// Valida que el tamano del archivo sea menor a 100MB
const validateSizeFile = ( req, res, next ) => {
    const { file } = req.files;

    if ( file.size > 10000000 ) {
        return res.status( 400 ).json({
            ok: false,
            message: 'El archivo es muy pesado',
        });
    }

    next();
}

module.exports = {
    validateExistFile,
    validateSizeFile
}
