const {model, Schema} = require('mongoose');

const temperaturaSchema = new Schema({

    fecha:{
        type: Date,
        required: true
    },

    alumno:{
        type: Schema.Types.ObjectId,
        reference: 'alumno'
    },

    temperatura:{
        type: Number
    }

})

module.exports = model('temperatura', temperaturaSchema);