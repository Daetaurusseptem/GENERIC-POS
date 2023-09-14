const Sale = require('../models/saleModel');

// Controlador para obtener todas las ventas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

// Controlador para crear una nueva venta
exports.createSale = async (req, res) => {
  const { total, discount, iva, productsSold } = req.body;

  try {
    const date = new Date(); // Obtiene la fecha actual del servidor
    const sale = await Sale.create({
      date,
      total,
      discount,
      iva,
      productsSold,
    });
    res.json(sale);
  } catch (error) {
    console.error('Error al crear una venta:', error);
    res.status(500).json({ error: 'Error al crear una venta' });
  }
};

// Controlador para obtener una venta por su ID
exports.getSaleById = async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.findByPk(saleId);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(sale);
  } catch (error) {
    console.error('Error al obtener una venta:', error);
    res.status(500).json({ error: 'Error al obtener una venta' });
  }
};

// Controlador para actualizar una venta por su ID
exports.updateSaleById = async (req, res) => {
  const saleId = req.params.id;
  const { total, discount, iva, productsSold } = req.body;

  try {
    const sale = await Sale.findByPk(saleId);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    // Actualiza los campos de la venta
    sale.total = total;
    sale.discount = discount;
    sale.iva = iva;
    sale.productsSold = productsSold;

    await sale.save();

    res.json(sale);
  } catch (error) {
    console.error('Error al actualizar una venta:', error);
    res.status(500).json({ error: 'Error al actualizar una venta' });
  }
};

// Controlador para eliminar una venta por su ID
exports.deleteSaleById = async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.findByPk(saleId);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    await sale.destroy();

    res.json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar una venta:', error);
    res.status(500).json({ error: 'Error al eliminar una venta' });
  }
};
