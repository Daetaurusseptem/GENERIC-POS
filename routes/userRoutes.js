const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas por autenticación JWT
router.get('/', authMiddleware.authenticateJWT, userController.getAllUsers);
router.get('/:id', authMiddleware.authenticateJWT, userController.getUserById);

// Rutas de usuarios
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
