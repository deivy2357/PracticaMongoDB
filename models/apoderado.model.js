const { Schema, model } = require('mongoose');

const ApoderadoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    lastName1: {
        type: String,
        required: true
    },
    lastName2: {
        type: String,
        required: false
    },
    parentesco: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },


});


ApoderadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Apoderado', ApoderadoSchema);