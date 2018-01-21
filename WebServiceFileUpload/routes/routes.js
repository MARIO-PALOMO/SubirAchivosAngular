var express = require('express');
var router = express.Router();
var controllers = require('.././controladores');

router.post('/ArchivoGuardar', controllers.ControladorArchivo.guardarArchivo);
router.get('/ArchivoListar', controllers.ControladorArchivo.listarAchivos);
router.get('/ArchivoListarCodigo', controllers.ControladorArchivo.listarAchivosPorCodigo);


module.exports = router;