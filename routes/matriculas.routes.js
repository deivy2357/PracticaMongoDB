const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
} = require('../controllers/matriculas.controller')


const router = Router();

router.get('/', getMatriculas);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del matricula es necesario').not().isEmpty(),
        check('apoderado', 'El id del apoderado debe de ser válido').isMongoId(),
        check('turno', 'El id del turno debe de ser válido').isMongoId(),
        check('curso', 'El id del curso debe de ser válido').isMongoId(),

        validarCampos
    ],
    crearMatricula
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del matricula es necesario').not().isEmpty(),
        check('apoderado', 'El id del apoderado debe de ser válido').isMongoId(),
        check('turno', 'El id del turno debe de ser válido').isMongoId(),
        check('curso', 'El id del curso debe de ser válido').isMongoId(),

        validarCampos
    ],
    actualizarMatricula
);

router.delete('/:id',
    eliminarMatricula
);



module.exports = router;