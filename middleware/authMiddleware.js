const jwtHelper = require('../helpers/jwtHelper');

// Middleware para verificar la autenticación mediante JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const user = jwtHelper.verifyToken(token);
  if (!user) {
    return res.status(403).json({ error: 'Token inválido' });
  }

  // Agrega el usuario autenticado al objeto de solicitud
  req.user = user;
  next();
};
