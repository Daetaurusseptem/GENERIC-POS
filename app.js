const express = require('express');
const sequelize = require('./config/db.js'); // Archivo que contiene la configuración de Sequelize
const app = express();

// Configuración de Sequelize (debes definir tu configuración en el archivo database.js)
sequelize.sync({alter:true}).then(r => {
    console.log(r);
  console.log('Base de datos conectada y sincronizada. ');
}).catch((error) => {
  console.error('Error al conectar y sincronizar la base de datos:', error);
});

// Middleware
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Rutas de productos
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
