const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { saveFile, saveFileInDB, downloadFile, getFileData } = require('../controllers/files');

const { validateErrors } = require('../middlewares/validateErrors');
const { validateFileExist } = require('../middlewares/validateFileExist');
const { validateExistFile, validateSizeFile } = require('../middlewares/validateFileUpload');
const { validatePassword } = require('../middlewares/validatePassword');

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
        check('password').isLength({ min: 6 }),
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
        validatePassword
    ],
    downloadFile
);

router.get(
    '/:name',
    [
        validateFileExist
    ],
    getFileData
)

module.exports = router;
