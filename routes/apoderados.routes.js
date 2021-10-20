/*
    Path: /api/proyectos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getApoderados, crearApoderado, actualizarApoderado, eliminarApoderado } = require('../controllers/apoderados.controller')
const router = Router();

router.get('/', getApoderados);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Apoderado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearApoderado);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Apoderado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarApoderado);

router.delete('/:id', validarJWT, eliminarApoderado);

module.exports = router;