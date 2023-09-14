const Product = require('../models/productModel');

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { name, price, description, expirationDate, discount, stock } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      expirationDate,
      discount,
      stock,
    });
    res.json(product);
  } catch (error) {
    console.error('Error al crear un producto:', error);
    res.status(500).json({ error: 'Error al crear un producto' });
  }
};

// Controlador para obtener un producto por su ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener un producto:', error);
    res.status(500).json({ error: 'Error al obtener un producto' });
  }
};

// Controlador para actualizar un producto por su ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, expirationDate, discount, stock } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza los campos del producto
    product.name = name;
    product.price = price;
    product.description = description;
    product.expirationDate = expirationDate;
    product.discount = discount;
    product.stock = stock;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Error al actualizar un producto:', error);
    res.status(500).json({ error: 'Error al actualizar un producto' });
  }
};

// Controlador para eliminar un producto por su ID
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();

    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar un producto:', error);
    res.status(500).json({ error: 'Error al eliminar un producto' });
  }
};

// Controlador para actualizar el stock de un producto después de una venta
exports.updateProductStock = async (productId, quantitySold) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      console.error('Producto no encontrado');
      return;
    }

    // Actualiza el stock restando la cantidad vendida
    product.stock -= quantitySold;

    await product.save();
  } catch (error) {
    console.error('Error al actualizar el stock del producto:', error);
  }
};
