const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/dbConnection');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){

        this.app = express();

        this.paths = {
            alumno: '/api/alumno',
            maestro: '/api/maestro',
            auth: '/api/auth',
            temperatura: '/api/temperatura'
        }

        this.port = 4000;

        this.DB();
        this.middlewares();
        this.routes();

    }

    async DB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(express.static('uploads'));

         //Carga de archivos
         this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes(){

        this.app.use(this.paths.alumno, require('../routes/alumno'));
        this.app.use(this.paths.temperatura, require('../routes/temperatura'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.maestro, require('../routes/maestro'));
    }

    listen(){            
            this.app.listen(this.port, () => {
                console.log('Server on port', this.port);
            });
    }


}

module.exports = Server;