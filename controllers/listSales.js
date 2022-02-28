const salesModel = require('../models/listSales');

const listAllSales = async (req, res) => {
  const sales = await salesModel.getAllSales();
  const sortedSales = sales.sort((a, b) => a.saleId - b.saleId);
  return res.status(200).json(sortedSales);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesModel.getAllSales();
  const saleById = sales.filter((sale) => sale.saleId === Number(id));
  const salesWithOutSaleId = saleById.map((sale) => (
    {
      date: sale.date,
      productId: sale.productId,
      quantity: sale.quantity,
    }));
  
  if (saleById.length === 0) return res.status(404).json({ message: 'Sale not found' });

  if (saleById.length === 1) return res.status(200).json(saleById);

  if (saleById.length > 1) return res.status(200).json(salesWithOutSaleId);
};

module.exports = {
  listAllSales,
  listSaleById,
};
