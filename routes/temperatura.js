const {Router} = require('express');
const {obtenerTemperaturas,agregarTemperatura} = require('../controller/temperaturaController');

const router = Router();

router.post('/', agregarTemperatura);
router.get('/:numControl', obtenerTemperaturas);


module.exports = router;