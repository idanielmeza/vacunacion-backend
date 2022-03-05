const {Router} = require('express');
const {agregarMaestro} = require('../controller/maestroController');

const router = Router();

router.post('/', agregarMaestro);

module.exports = router;