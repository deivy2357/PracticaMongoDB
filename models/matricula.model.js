const { Schema, model } = require('mongoose');

const MatriculaSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    docente: {
        type: Schema.Types.ObjectId,
        ref: 'Docente',
        required: true
    },
    apoderado: {
        type: Schema.Types.ObjectId,
        ref: 'Apoderado',
        required: true
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },



});


MatriculaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Matricula', MatriculaSchema);