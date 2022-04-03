const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const cron = require('../utilities/cron-config');
const { sequelize } = require('../database/config');

class Server {
	constructor() {
		this.app = express();

        this.port = process.env.PORT;

		this.paths = {
            files: '/api/files',
        }

		// Conectar a base de Datos
		this.connectDB();

		// Middlewares
		this.middlewares();

		// Rutas de la aplicacion
		this.routes();
	}

	// Conectar a base de Datos
	async connectDB() {
		try {
			await sequelize.authenticate();
			console.log('Base de datos conectada');

		} catch ( error ) {
			console.log( error );
		}
	}

	middlewares() {
		// CORS
		this.app.use( cors({
			origin: true,
			credentials: true,
		}));

		// Lectura y parseo del body
		this.app.use( express.json() );

        // Subida de archivos
        this.app.use( fileUpload({
            limits: { fileSize: 100000000 }
		}));

		// Eliminar archivos temporales
		cron();
	}

	routes() {
		this.app.use( this.paths.files, require('../routes/files') );
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`Servidor corriendo en: http://localhost:${ this.port }/`);
		});
	}
}

module.exports = Server;
