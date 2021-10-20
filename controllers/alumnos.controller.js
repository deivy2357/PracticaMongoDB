const { response } = require('express');
const faker = require('faker');
const { createBulkAlumnos } = require('../faker/alumnosFaker');
faker.locale = 'es';

const Alumno = require('../models/alumno.model');

const getAlumnos = async(req, res) => {

    const alumnos = await Alumno.find().populate('usuario', 'nombre img');



    res.json({
        ok: true,
        alumnos: alumnos
    })
}

const crearAlumnosMaviso = async(req, res) => {
    const bulk = await createBulkAlumnos();
    return res.json({
        bulk
    });
}

const buscarAlumno = async(req, res) => {
    const pagina = parseInt(req.query.pagina);
    const total = parseInt(req.query.total);
    const genero = req.query.genero;
    //const nombre = req.query.nombre;

    const posicion = (pagina - 1) * total;

    const [listaAlumnos, cantidadAlumnos] = await Promise.all([
        // primera promesa
        Alumno.find({
            sexo: genero,
            //nombre: nombre,
        })
        .skip(posicion)
        .limit(total),
        // segunda promesa
        Alumno.countDocuments()
    ]);

    const totalPaginas = Math.ceil(cantidadAlumnos / total);

    res.json({
        alumnos: listaAlumnos,
        total: cantidadAlumnos,
        paginas: totalPaginas,
    });
}

const crearAlumno = async(req, res = response) => {

    const uid = req.uid;
    const alumno = new Alumno({
        usuario: uid,
        ...req.body
    });


    try {

        const alumnoDB = await alumno.save();


        res.json({
            ok: true,
            alumno: alumnoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el alumno'
        })
    }


}

const actualizarAlumno = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {

        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no encontrado por id',
            });
        }
        const cambiosAlumno = {
            ...req.body,
            usuario: uid
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(id, cambiosAlumno, { new: true });
        res.json({
            ok: true,
            alumno: alumnoActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Alumno, consulte con el administrador'
        })
    }
}

const eliminarAlumno = async(req, res = response) => {
    const id = req.params.id;

    try {

        const alumno = await Alumno.findById(id);

        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no encontrado por id',
            });
        }
        await Alumno.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Alumno borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Alumno no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    buscarAlumno,
    crearAlumnosMaviso
}