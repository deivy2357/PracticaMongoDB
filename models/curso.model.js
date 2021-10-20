const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },


    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});


CursoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Curso', CursoSchema);