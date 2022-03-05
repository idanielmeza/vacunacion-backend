const {Router} = require('express');
const {obtenerAlumnos, obtenerAlumno, agregarAlumno, alumnoEnfermo, alumnoSano, agregarDatos, obtenerEnfermos, grafica, graficaEnfermos, obtenerCertificado} = require('../controller/alumnoController');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/verificar-jwt');

const router = Router();

router.post('/', agregarAlumno);
router.get('/',obtenerAlumnos);
router.get('/buscar/:numControl', obtenerAlumno);

router.get('/certificado/:numControl', obtenerCertificado)

router.put('/datos/:numControl', agregarDatos)

router.get('/enfermo', obtenerEnfermos)
router.put('/enfermo/:numControl', alumnoEnfermo);

router.put('/sano/:numControl', alumnoSano);

router.get('/grafica', grafica)
router.get('/graficaEnfermo', graficaEnfermos)

module.exports = router;