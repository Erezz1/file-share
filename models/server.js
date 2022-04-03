const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const cron = require('../utilities/cron-config');
const { handleDisconnect } = require('../database/config');
const { createDB } = require('../utilities/adapterDB');

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
		await handleDisconnect();
		await createDB();

		console.log('Base de datos conectada');
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
