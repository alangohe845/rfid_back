const mongoose = require("mongoose");

const medicionesSchema= new mongoose.Schema({
      id: {
        type: String,
      },
      RFID: {
        type: String,
      },
});

module.exports = mongoose.model("mediciones", medicionesSchema, "lector"); //Ultimo parametro nombre de la coleccion
