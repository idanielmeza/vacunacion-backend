const {model,Schema} = require('mongoose');

const alumnoSchema = new Schema({

    numControl:{
        type:String,
        required: true
    },

    nombre:{
        type:String,
        required: true
    },

    carrera:{
        type:String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    semestre:{
        type: Number,
    },

    fVacuna:{
        type: Date
    },

    tVacuna:{
        type: String
    },

    certificado:{
        type: Boolean,
        default: false
    },

    enfermo:{
        type: Boolean
    },

    fEnfermo:{
        type:Date
    }

});

module.exports = model('alumno',alumnoSchema);