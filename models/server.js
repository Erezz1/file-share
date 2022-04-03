const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const { dbConnection } = require('../database/config');
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

	async connectDB() {
		try {
			await dbConnection.connect();
			await createDB();
			console.log('Base de datos conectada');

		} catch ( error ) {
			console.error(`Error al conectar a la base de datos: ${ error }`);
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
