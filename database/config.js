const mysql = require('mysql2');

const dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
}

const dbConnection = mysql.createConnection( dbConfig );

const db = ( query ) => {
    return new Promise( ( resolve, reject ) => {
        dbConnection.query( query, ( error, rows, fields ) => {
            if( error ) return reject( error );
            resolve( rows );
        });
    });
}

module.exports = {
    dbConnection,
    db
}
