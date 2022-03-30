// Obtiene la extensión de un archivo
const getExtension = ( fileName ) => {
    const arrName = fileName.split('.');
    const extension = arrName[ arrName.length - 1 ];

    return extension;
}

module.exports = {
    getExtension
}
