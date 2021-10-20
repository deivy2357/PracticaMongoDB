const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTurnos, crearTurno, actualizarTurno, eliminarTurno } = require('../controllers/turnos.controller')
const router = Router();

router.get('/', getTurnos);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Turnos es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearTurno);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Turno es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarTurno);

router.delete('/:id', validarJWT, eliminarTurno);

module.exports = router;