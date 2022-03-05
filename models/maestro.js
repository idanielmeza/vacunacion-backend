const {model,Schema} = require('mongoose');

const maestroSchema = new Schema({

    numControl:{
        type: String,
        required:true
    },

    nombre: {
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    maestro:{
        type: Boolean,
        default: true
    }

})

module.exports = model('Maestro',maestroSchema);