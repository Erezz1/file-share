const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { saveFile, saveFileInDB, downloadFile, getFileData, runServer } = require('../controllers/files');

const { validateErrors } = require('../middlewares/validateErrors');
const { validateFileExist } = require('../middlewares/validateFileExist');
const { validateExistFile, validateSizeFile } = require('../middlewares/validateFileUpload');

// Almacena el archivo en el servidor en la carpeta "uploads"
router.post(
    '/upload',
    [
        validateExistFile,
        validateSizeFile
    ],
    saveFile
);

// Actualizar la cantidad de descargas y la contraseña del archivo
router.put(
    '/:name',
    [
        check('downloads').isNumeric(),
        check('password').isString(),
        validateErrors,
        validateFileExist
    ],
    saveFileInDB
);

// Descargar el archivo
router.get(
    '/download/:name',
    [
        validateFileExist,
    ],
    downloadFile
);

// Obtener los datos del archivo
router.get(
    '/:name',
    [
        validateFileExist
    ],
    getFileData
)

// Encender el servidor
router.get(
    '/',
    runServer
);

module.exports = router;
