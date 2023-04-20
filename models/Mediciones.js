const mongoose = require("mongoose");
const socketIo = require("socket.io")
const medicionesSchema= new mongoose.Schema({
      id: {
        type: String,
      },
      RFID: {
        type: String,
      },
});

const server = require('http').createServer();
const io = socketIo(server);

io.listen(3000);
io.on('coneccion', (socket) => {
  const changeStream = medicionesSchema.watch();

  changeStream.on('change', (change) => {
    socket.emit('update', change.fullDocument);
  });
  socket.on('disconect', () => {
    changeStream.close()
  });

});

module.exports = mongoose.model("mediciones", medicionesSchema, "lector"); //Ultimo parametro nombre de la coleccion
