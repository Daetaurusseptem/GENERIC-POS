const jwt = require('jsonwebtoken');

// Secret key para JWT (debes configurar esto de manera segura)
const jwtSecretKey = 'tu_secreto_secreto';

// Genera un token JWT con los datos proporcionados
exports.generateToken = (data) => {
  return jwt.sign(data, jwtSecretKey);
};

// Verifica un token JWT y devuelve los datos del usuario si es válido
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch (error) {
    return null; // El token no es válido
  }
};
