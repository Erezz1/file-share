const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

const db = ( query ) => {
    return new Promise( ( resolve, reject ) => {
        dbConnection.query( query, ( err, rows, fields ) => {
            if( err ) return reject( err );
            resolve( rows );
        });
    });
}

module.exports = {
    dbConnection,
    db
}
