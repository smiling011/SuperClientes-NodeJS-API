const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

sequelize.authenticate()
  .then(() => console.log(" Conexion a la base de datos exitosa"))
  .catch(err => console.error(" Error al conectar con la base de datos:", err));

module.exports = sequelize;
