const mysql = require('mysql');

const dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
}

const dbConnection = mysql.createConnection( dbConfig );

const handleDisconnect = () => {
    dbConnection.connect( error => {
        if ( error ) {
            console.log( 'Error al conectar a la base de datos: ', error );
            setTimeout( handleDisconnect, 2000 );
        }
    });

    dbConnection.on( 'error', error => {
        console.log('Error al conectar a la base de datos: ', error );

        if ( error.code === 'PROTOCOL_CONNECTION_LOST' ) {
            handleDisconnect();
        } else {
            throw error;
        }
    });
}

const db = ( query ) => {
    return new Promise( ( resolve, reject ) => {
        dbConnection.query( query, ( err, rows, fields ) => {
            if( err ) return reject( err );
            resolve( rows );
        });
    });
}

module.exports = {
    handleDisconnect,
    db
}
