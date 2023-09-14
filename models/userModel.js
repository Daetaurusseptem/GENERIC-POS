const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario',
    allowNull: false,
  },
  // Otros campos de usuario aquí
});

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
User.sync();

module.exports = User;
