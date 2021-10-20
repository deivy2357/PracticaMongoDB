const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
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
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    apoderado: {
        type: Schema.Types.ObjectId,
        ref: 'Apoderado',
        required: false
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: false
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno',
        required: true
    }




});


AlumnoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Alumno', AlumnoSchema);