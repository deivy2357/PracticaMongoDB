const { response } = require('express');

const Apoderado = require('../models/apoderado.model');


const getApoderados = async(req, res = response) => {

    const apoderados = await Apoderado.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        apoderados
    })
}

const crearApoderado = async(req, res = response) => {

    const uid = req.uid;
    const apoderado = new Apoderado({
        usuario: uid,
        ...req.body
    });

    try {

        const apoderadoDB = await apoderado.save();

        res.json({
            ok: true,
            apoderado: apoderadoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar apoderado, consulte con el administrador'
        })
    }

}

const actualizarApoderado = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const apoderado = await Apoderado.findById(id);

        if (!apoderado) {
            return res.status(404).json({
                ok: true,
                msg: 'Apoderado no encontrado por id',
            });
        }

        const cambiosApoderado = {
            ...req.body,
            usuario: uid
        }

        const apoderadoActualizado = await Apoderado.findByIdAndUpdate(id, cambiosApoderado, { new: true });


        res.json({
            ok: true,
            apoderado: apoderadoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el Apoderado, consulte con el administrador'
        })
    }

}

const eliminarApoderado = async(req, res = response) => {

    const id = req.params.id;

    try {

        const apoderado = await Apoderado.findById(id);

        if (!apoderado) {
            return res.status(404).json({
                ok: true,
                msg: 'Apoderado no encontrado por id',
            });
        }

        await Apoderado.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Apoderado se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el Apoderado, consulte con el administrador'
        })
    }
}

module.exports = {
    getApoderados,
    crearApoderado,
    actualizarApoderado,
    eliminarApoderado,
}