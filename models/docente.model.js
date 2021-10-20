const { Schema, model } = require('mongoose');

const DocenteSchema = Schema({
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
    direccion: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    cargo: {
        type: String,
        required: false
    },
    sueldo: {
        type: String,
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },

    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno',
        required: true
    }

});


DocenteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Docente', DocenteSchema);