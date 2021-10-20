const { response } = require('express');

const Turno = require('../models/turno.model');


const getTurnos = async(req, res = response) => {

    const turnos = await Turno.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        turnos
    })
}

const crearTurno = async(req, res = response) => {

    const uid = req.uid;
    const turno = new Turno({
        usuario: uid,
        ...req.body
    });

    try {

        const turnoDB = await turno.save();

        res.json({
            ok: true,
            turno: turnoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar turno, consulte con el administrador'
        })
    }

}

const actualizarTurno = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const turno = await Turno.findById(id);

        if (!turno) {
            return res.status(404).json({
                ok: true,
                msg: 'Turno no encontrado por id',
            });
        }
        const cambiosTurno = {
            ...req.body,
            usuario: uid
        }

        const turnoActualizado = await Turno.findByIdAndUpdate(id, cambiosTurno, { new: true });
        res.json({
            ok: true,
            turno: turnoActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el Turno, consulte con el administrador'
        })
    }
}

const eliminarTurno = async(req, res = response) => {

    const id = req.params.id;
    try {
        const turno = await Turno.findById(id);

        if (!turno) {
            return res.status(404).json({
                ok: true,
                msg: 'Turno no encontrado por id',
            });
        }

        await Turno.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Turno se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el Turno, consulte con el administrador'
        })
    }
}

module.exports = {
    getTurnos,
    crearTurno,
    actualizarTurno,
    eliminarTurno,
}