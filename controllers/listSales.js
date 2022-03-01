const salesModel = require('../models/listSales');
// Requisito 02
const listAllSales = async (req, res, next) => {
  try {
    const sales = await salesModel.getAllSales();
    const sortedSales = sales.sort((a, b) => a.saleId - b.saleId);
    return res.status(200).json(sortedSales);
  } catch (e) {
    next(e);
  }
};
// Requisito 02
const listSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesModel.getSaleById(id);
    const salesWithOutSaleId = sales.map((sale) => (
      {
        date: sale.date,
        productId: sale.productId,
        quantity: sale.quantity,
      }));
    
    if (!sales.length) return res.status(404).json({ message: 'Sale not found' });

    if (sales.length > 1) return res.status(200).json(salesWithOutSaleId);
    
    return res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
};
// Requisito 07
const createNewSale = async (req, res, next) => {
  try {
    const order = [...req.body];
    const createdOrder = await salesModel.createSale(order);

    return res.status(201).json(createdOrder);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllSales,
  listSaleById,
  createNewSale,
};
