const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const clienteRoutes = require("./routes/cliente");
const sequelize = require("./config/config");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/clientes", clienteRoutes);

// Sincronizar modelos
sequelize.sync()
  .then(() => console.log("Tablas sincronizadas"))
  .catch(err => console.error("Error al sincronizar tablas:", err));

module.exports = app;
