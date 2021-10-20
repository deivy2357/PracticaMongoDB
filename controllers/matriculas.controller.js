const { response } = require('express');

const Matricula = require('../models/matricula.model');

const getMatriculas = async(req, res = response) => {

    const matriculas = await Matricula.find().populate('usuario', 'nombre img');



    res.json({
        ok: true,
        matriculas: matriculas
    })
}

const crearMatricula = async(req, res = response) => {

    const uid = req.uid;
    const matricula = new Matricula({
        usuario: uid,
        ...req.body
    });


    try {

        const matriculaDB = await matricula.save();


        res.json({
            ok: true,
            matricula: matriculaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el matricula'
        })
    }


}

const actualizarMatricula = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const matricula = await Matricula.findById(id);

        if (!matricula) {
            return res.status(404).json({
                ok: true,
                msg: 'Matricula no encontrado por id',
            });
        }
        const cambiosMatricula = {
            ...req.body,
            usuario: uid
        }
        const matriculaActualizado = await Matricula.findByIdAndUpdate(id, cambiosMatricula, { new: true });
        res.json({
            ok: true,
            matricula: matriculaActualizado
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Matricula, consulte con el administrador'
        })
    }
}

const eliminarMatricula = async(req, res = response) => {

    const id = req.params.id;

    try {

        const matricula = await Matricula.findById(id);
        if (!matricula) {
            return res.status(404).json({
                ok: true,
                msg: 'Matricula no encontrado por id',
            });
        }
        await Matricula.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Matricula borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Matricula no puede eliminarse, consulte con el administrador'
        })
    }
}



module.exports = {
    getMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
}