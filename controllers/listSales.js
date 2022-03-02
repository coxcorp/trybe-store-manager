const salesModel = require('../models/listSales');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listAllSales = async (req, res, next) => {
  try {
    const sales = await salesModel.getAllSales();
    const sortedSales = sales.sort((a, b) => a.saleId - b.saleId);
    return res.status(200).json(sortedSales);
  } catch (e) {
    next(e);
  }
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
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
// Requisito 07 - Crie um endpoint para cadastrar vendas
const createNewSale = async (req, res, next) => {
  try {
    const order = req.body[0];
    console.log(order.productId);
    console.log(order.quantity);
    // Requisito 03
    if (!order.productId) return res.status(400).json({ message: '"productId" is required' });
    if (order.quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!order.quantity) return res.status(400).json({ message: '"quantity" is required' });

    const createdOrder = await salesModel.createSale(order);

    return res.status(201).json(createdOrder);
  } catch (e) {
    next(e);
  }
};
// Requisito 08 - Crie um endpoint para atualizar uma venda
const editSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { quantity, productId } = req.body[0];
    // Requisito 03
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    if (quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

    const editedSale = await salesModel.editSaleById({ quantity, saleId: Number(id), productId });
    
    return res.status(200).json(editedSale);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllSales,
  listSaleById,
  createNewSale,
  editSaleById,
};
