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

const updateFile = async ( { downloads, password = '' }, name ) => {
    return await db(`
        UPDATE file
        SET
            downloads = ${ downloads },
            password = '${ password }'
        WHERE
            name = '${ name }'
    `)
}

const discuntFile = async ( name ) => {
    return await db(`
        UPDATE file
        SET
            downloads = downloads - 1
        WHERE
            name = '${ name }'
    `);
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

const getAllFiles = async () => {
    return await db(`
        SELECT name
        FROM file
    `);
}

const createDB = async () => {
    await db(`
        CREATE TABLE IF NOT EXISTS file (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) DEFAULT '',
            downloads TINYINT DEFAULT 1,
            original_name VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        );
    `);
}

module.exports = {
    addFile,
    updateFile,
    getFile,
    deleteFile,
    getAllFiles,
    discuntFile,
    createDB
}
