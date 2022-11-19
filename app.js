// app.js
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//variables de entorno
require("dotenv").config();

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB } = process.env;

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@nube.5gylyeu.mongodb.net/${MONGO_DB}`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("conectado a mongodb"))
  .catch((e) => console.log("error de conexión", e));

// motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

//Rutas web
app.use("/", require("./router/RutasWeb"));
app.use("/contactos", require("./router/Contactos"));

app.use((req, res, next) => {
  res.status(404).render("404", {
    titulo: "404",
    descripcion: "Título del sitio web",
  });
});

app.listen(port, () => {
  console.log("servidor a su servicio en el puerto", port);
});
