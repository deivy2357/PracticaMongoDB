const { response } = require('express');

const Curso = require('../models/curso.model');


const getCursos = async(req, res = response) => {

    const cursos = await Curso.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        cursos
    })
}

const crearCurso = async(req, res = response) => {

    const uid = req.uid;
    const curso = new Curso({
        usuario: uid,
        ...req.body
    });

    try {

        const cursoDB = await curso.save();

        res.json({
            ok: true,
            curso: cursoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar curso, consulte con el administrador'
        })
    }

}

const actualizarCurso = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrado por id',
            });
        }

        const cambiosCurso = {
            ...req.body,
            usuario: uid
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, cambiosCurso, { new: true });


        res.json({
            ok: true,
            curso: cursoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el Curso, consulte con el administrador'
        })
    }

}

const eliminarCurso = async(req, res = response) => {
    const id = req.params.id;
    try {

        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrado por id',
            });
        }

        await Curso.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'El Curso se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el Curso, consulte con el administrador'
        })
    }
}

module.exports = {
    getCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso,
}