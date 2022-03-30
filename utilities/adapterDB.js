const { db } = require('../database/config');

const addFile = async ( path, name ) => {
    return await db(`
        INSERT 
        INTO file
            (name, password, downloads, original_name)
        VALUES
            ('${ path }', '', 1, '${ name }');
    `)
}

const updateFile = async ( { downloads, password }, name ) => {
    return await db(`
        UPDATE file
        SET
            downloads = ${ downloads },
            password = '${ password }'
        WHERE
            name = '${ name }'
    `)
}

const getFile = async ( name ) => {
    return await db(`
        SELECT *
        FROM file
        WHERE
            name = '${ name }'
    `)
}

const deleteFile = async ( name ) => {
    return await db(`
        DELETE
        FROM file
        WHERE
            name = '${ name }'
    `)
}

module.exports = {
    addFile,
    updateFile,
    getFile,
    deleteFile
}
