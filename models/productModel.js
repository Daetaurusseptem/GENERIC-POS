const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Puedes establecer el stock inicial a cero
  },
  // Otros campos específicos de productos aquí
});

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
Product.sync();

module.exports = Product;
