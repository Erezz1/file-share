const { db } = require('../database/config');

const validateFileExist = async ( req, res, next ) => {
    const { name } = req.params;

    const results = await db(`
        SELECT name
        FROM file
        WHERE
            name = '${ name }'
    `)

    if ( results.length === 0 ) {
        return res.status(404).json({
            ok: false,
            msg: 'El archivo no existe',
        });
    }

    next();
}

module.exports = { validateFileExist }
