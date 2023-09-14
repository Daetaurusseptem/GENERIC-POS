const Sequelize = require('sequelize');

// Configura la conexión a la base de datos
const sequelize = new Sequelize(
    'punto_venta', 
    'root', 
    '123456789', {
  host: 'localhost',
  dialect: 'mysql',
});

// Exporta la instancia de Sequelize
module.exports = sequelize;
