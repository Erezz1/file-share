const { db } = require('../database/config');

const validatePassword = async ( req, res, next ) => {

    const { password } = req.body;
    const { name } = req.params;

    const pass = await db(`
        SELECT password
        FROM file
        WHERE
            name = '${ name }'
    `)

    if ( pass[0].password !== password ) {
        return res.status(401).json({
            ok: false,
            msg: 'Contraseña incorrecta',
        });
    }

    next();
}

module.exports = { validatePassword }
