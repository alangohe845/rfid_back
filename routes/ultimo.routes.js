/*Primero, se importa la librería express. */
const express = require("express");
/*Luego, se importa el archivo ultimo.js que contiene el controlador que define la lógica para manejar las solicitudes a la API relacionadas con la información de la última medición. */
const medicionesCtrl= require("../controllers/ultimo");
/*Después, se crea un objeto router que contendrá la ruta en cuestión. */
const router = express.Router();
/* usando el método get(). El primer parámetro es la URL relativa que se debe usar para acceder a esta ruta, que en este caso es "/". El segundo parámetro es una referencia al controlador findAllmediciones que se ha importado desde el archivo ultimo.js. */
router.get("/", medicionesCtrl.findAllmediciones);
/*Por último, se exporta el objeto router para que pueda ser utilizado por otros módulos. */
module.exports = router;