const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sales = sequelize.define('Sale', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  iva: {
    type: DataTypes.FLOAT,
  },
  // Agrega un campo "productsSold" para registrar los productos vendidos
  productsSold: {
    type: DataTypes.JSON, // Almacena un arreglo de objetos JSON con detalles de los productos vendidos
  },
  // Otros campos relacionados con ventas aquí
});
console.log("SALE", Sales)
// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Sales.sync()

module.exports = Sale;
