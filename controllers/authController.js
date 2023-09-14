const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwtHelper = require('../helpers/jwtHelper');

// Controlador para iniciar sesión y generar un token JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca el usuario por nombre de usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    // Si no se encuentra el usuario o la contraseña es incorrecta, devuelve un error
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Genera un token JWT con el ID de usuario y su nombre de usuario
    const token = jwtHelper.generateToken({ userId: user.id, username: user.username });

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
