const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas por autenticación JWT
router.get('/', authMiddleware.authenticateJWT, productController.getAllProducts);
router.get('/:id', authMiddleware.authenticateJWT, productController.getProductById);

// Rutas de productos
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
