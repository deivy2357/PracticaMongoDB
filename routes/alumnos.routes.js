const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    buscarAlumno,
    crearAlumnosMaviso
} = require('../controllers/alumnos.controller')


const router = Router();

router.get('/buscar', buscarAlumno)
router.post('/masivo', crearAlumnosMaviso)

router.get('/', getAlumnos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del alumno es necesario').not().isEmpty(),
        check('apoderado', 'El id del apoderado debe de ser válido').isMongoId(),
        check('turno', 'El id del turno debe de ser válido').isMongoId(),
        check('curso', 'El id del curso debe de ser válido').isMongoId(),

        validarCampos
    ],
    crearAlumno
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alumno es necesario').not().isEmpty(),
        check('apoderado', 'El id del apoderado debe de ser válido').isMongoId(),
        check('turno', 'El id del turno debe de ser válido').isMongoId(),
        check('curso', 'El id del curso debe de ser válido').isMongoId(),

        validarCampos
    ],
    actualizarAlumno
);

router.delete('/:id',
    eliminarAlumno
);



module.exports = router;