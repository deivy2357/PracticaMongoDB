const { Schema, model } = require('mongoose');

const TurnoSchema = Schema({
    turno: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },



    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});


TurnoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Turno', TurnoSchema);