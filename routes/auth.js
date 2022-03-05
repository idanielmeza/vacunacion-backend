const {Router} = require('express');
const { check } = require('express-validator');
const { login, renovarToken } = require('../controller/authController');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/verificar-jwt');

const router = Router();

router.post('/login', [
    check('numControl', 'El numero de control es obligatorio'),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo de usuairo es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/', validarJWT, renovarToken);

module.exports = router;