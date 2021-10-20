const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCursos, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/cursos.controller')
const router = Router();

router.get('/', getCursos);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Cursos es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCurso);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Curso es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCurso);

router.delete('/:id', validarJWT, eliminarCurso);

module.exports = router;