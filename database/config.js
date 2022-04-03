const { Sequelize } = require('sequelize');

const dbConfig = {
    host     : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    dialect  : 'mysql',
    logging  : false
}

const sequelize = new Sequelize( dbConfig );

const db = async ( query ) => {
    try {
        const result = await sequelize.query( query );
        return result[0];

    } catch( error ) {
        console.log( error );
    }
}

module.exports = {
    sequelize,
    db
}
