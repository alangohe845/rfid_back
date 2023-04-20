/*Primero, se importa Express, Morgan (un middleware para la generación de logs HTTP) y CORS (un middleware para permitir solicitudes de diferentes dominios). */
const express = require("express");
const morgan = require("morgan");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const mediciones = require('./models/Mediciones')
/*Luego, se importan las rutas que se han definido en archivos separados utilizando el enrutador de Express. */
const medicionesRoutes = require("./routes/mediciones.routes");
const ultimoRoutes = require("./routes/ultimo.routes");
const userRoutes = require("./routes/users.routes");
/*Luego, se importan las rutas que se han definido en archivos separados utilizando el enrutador de Express. */
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin:'*',
  }
})

/*Después, se crea una instancia de Express y se configuran los middleware para el análisis de solicitudes JSON y para permitir solicitudes CORS. También se configura el middleware Morgan para registrar los detalles de las solicitudes HTTP en la consola. */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

io.on('connection', (socket) => {
  console.log('User connected');
  // Escuchar los cambios en la colección
  const changeStream = mediciones.watch();

  // Emitir los cambios al cliente
  changeStream.on('change', (change) => {
    socket.emit('update', change.fullDocument);
  });

  // Manejar la desconexión del cliente
  socket.on('disconnect', () => {
    changeStream.close();
  });

});
/*Luego, se define una ruta inicial "/" que simplemente devuelve "Si" cuando se accede. */
app.get("/", (req, res) => {
  res.send("Si");
});

/*Finalmente, se definen las rutas específicas de la API utilizando los middleware de las rutas importadas. Estas rutas son /api/mediciones y /api/ultimo que se corresponden con las rutas definidas en los archivos mediciones.routes.js y ultimo.routes.js respectivamente. */
app.use("/api/mediciones", medicionesRoutes);
app.use("/api/ultimo", ultimoRoutes);
app.use("/api", userRoutes)
/*Por último, la aplicación Express se exporta para poder ser utilizada por el archivo index.js que inicia el servidor. */
module.exports = server; 
