/*En la primera línea del código, se importa el módulo app.js, que contiene la configuración y definición de las rutas de la aplicación. */
const app = require("./app");
/*Luego, se define una constante llamada port que indica el puerto en el que se ejecutará el servidor. En este caso, el puerto es el 5000. */
const port = 5000;
/*Después, se importa el módulo mongoose para conectar la aplicación con la base de datos MongoDB. La constante URI contiene la URL de la base de datos a la que se conectará la aplicación. */
const mongoose = require("mongoose");
//asignacion del puerto y requerir el archivo app para iniciar el servidor

//conexion a mongodb atlas
const URI = "mongodb+srv://admin:12345@cluster0.tu5eg21.mongodb.net/RFID";

mongoose.set("strictQuery", false);

mongoose
  /*Se utiliza el método mongoose.connect para conectarse a la base de datos. */
  .connect(URI)
  /*El método then se utiliza para imprimir en la consola un mensaje si la conexión es exitosa. */
  .then(console.log("Conectado a mongo Atlas"))
  /*Si ocurre algún error durante la conexión, se utiliza el método catch para imprimir un mensaje de error en la consola. */
  .catch((error) => console.log(error));

/*Por último, se utiliza el método listen para iniciar el servidor y hacer que escuche las solicitudes entrantes en el puerto especificado. */
app.listen(port, () => {
  console.log("Server on port", port);
}); 
