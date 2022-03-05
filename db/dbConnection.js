const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        await mongoose.connect('mongodb://localhost:27017/vacunatec',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');


    } catch (error) {
        console.log(error);
        throw new Error('Error al inicar la base de datos');
    }

}

module.exports = {
    dbConnection
}