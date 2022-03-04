const salesService = require('../services/listSales');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listAllSales = async (req, res, next) => {
  try {
    const sales = await salesService.listAllSales();
    return res.status(sales.code).json(sales.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesService.listSaleById(id);

    return res.status(sales.code).json(sales.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 07 - Crie um endpoint para cadastrar vendas
const createNewSale = async (req, res, next) => {
  try {
    const order = req.body;
    const createdOrder = await salesService.createNewSale(order);

    return res.status(createdOrder.code).json(createdOrder.json);
  } catch (e) {
    next(e);
  }
};

// Requisito 08 - Crie um endpoint para atualizar uma venda
const editSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, productId } = req.body[0];

    const editedSale = await salesService.editSaleById({ saleId: Number(id), quantity, productId });
    return res.status(editedSale.code).json(editedSale.json);
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
