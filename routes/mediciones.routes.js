const express = require("express");
//Aqui importas el archivo que creaste en el controlador
const medicionesCtrl= require("../controllers/mediciones");

const router = express.Router();

router.get("/", medicionesCtrl.findAllmediciones);

module.exports = router;