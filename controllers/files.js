const fs = require('fs');
const path = require('path');
const { request, response } = require('express');

const { addFile, updateFile, getFile, deleteFile, discuntFile, onServer } = require('../utilities/adapterDB');
const { getExtension } = require('../utilities/getExtension');
const { saveFileInUploads } = require('../utilities/saveFile');

// Almacena el archivo en el servidor en la carpeta "uploads"
const saveFile = async ( req = request, res = response ) => {

    const { file } = req.files;
    const extension = getExtension( file.name );

    const path = await saveFileInUploads( file, extension );

    try {
        await addFile( path, file.name );

        return res.json({
            ok: true,
            path,
        })
    } catch ( error ) {
        console.log( error );

        return res.status(500).json({
            ok: false,
            msg: 'Error al guardar el archivo',
        });
    }
}

// Almacena los datos del archivo en la base de datos
const saveFileInDB = async ( req = request, res = response ) => {

    const { name } = req.params;
    const data = {
        downloads: req.body.downloads,
        password: req.body.password,
    }

    try {
        await updateFile( data, name );

        return res.json({
            ok: true,
            msg: 'Archivo actualizado',
        })
    } catch ( error ) {
        console.log( error );

        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el archivo',
        });
    }
}

// Descargar el archivo
const downloadFile = async ( req = request, res = response ) => {

    const { name } = req.params;

    const [ file ] = await getFile( name );
    const { original_name, downloads } = file;
    const extension = getExtension( original_name );

    const filePath = path.join( `${ __dirname }/../uploads/${ name }.${ extension }` );

    await res.download( filePath, original_name );

    // Actualizar la cantidad de descargas
    if ( downloads > 1 ) {
        return await discuntFile( name );
    }

    // Eliminar el archivo del servidor
    if ( downloads === 1 ) {
        await deleteFile( name );
        fs.unlink( filePath, ( error ) => {
            if ( error ) console.log( error );
        });
    }
}

// Obtener el archivo
const getFileData = async ( req = request, res = response ) => {

    const { name } = req.params;

    try {
        const [ file ] = await getFile( name );

        return res.json({
            ok: true,
            file,
        })
    } catch ( error ) {
        console.log( error );

        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener el archivo',
        });
    }
}

// Obtener todos los nombres de los archivos
const runServer = async ( req = request, res = response ) => {
    const results = await onServer();

    res.json({
        ok: true,
        msg: 'Servidor encendido y conectado a la base de datos',
        results
    });
}

module.exports = {
    saveFile,
    saveFileInDB,
    downloadFile,
    getFileData,
    runServer
};
