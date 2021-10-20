const { response } = require('express');

const Docente = require('../models/docente.model');

const getDocentes = async(req, res = response) => {

    const docentes = await Docente.find().populate('usuario', 'nombre img');



    res.json({
        ok: true,
        docentes: docentes
    })
}

const crearDocente = async(req, res = response) => {

    const uid = req.uid;
    const docente = new Docente({
        usuario: uid,
        ...req.body
    });


    try {

        const docenteDB = await docente.save();


        res.json({
            ok: true,
            docente: docenteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el docente'
        })
    }


}

const actualizarDocente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const docente = await Docente.findById(id);

        if (!docente) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por id',
            });
        }

        const cambiosDocente = {
            ...req.body,
            usuario: uid
        }

        const docenteActualizado = await Docente.findByIdAndUpdate(id, cambiosDocente, { new: true });


        res.json({
            ok: true,
            docente: docenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Docente, consulte con el administrador'
        })
    }

}

const eliminarDocente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const docente = await Docente.findById(id);

        if (!docente) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por id',
            });
        }

        await Docente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Docente borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Docente no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}