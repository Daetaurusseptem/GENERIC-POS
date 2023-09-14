const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, password, name, role } = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Cifra la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario en la base de datos
    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      role,
    });

    res.json(user);
  } catch (error) {
    console.error('Error al crear un usuario:', error);
    res.status(500).json({ error: 'Error al crear un usuario' });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener un usuario:', error);
    res.status(500).json({ error: 'Error al obtener un usuario' });
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { username, password, name, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza los campos del usuario
    user.username = username;
    
    if (password) {
      // Cifra la nueva contraseña antes de actualizarla
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.name = name;
    user.role = role;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error al actualizar un usuario:', error);
    res.status(500).json({ error: 'Error al actualizar un usuario' });
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar un usuario:', error);
    res.status(500).json({ error: 'Error al eliminar un usuario' });
  }
};
