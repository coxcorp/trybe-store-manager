const salesModel = require('../models/listSales');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listAllSales = async () => {
  const sales = await salesModel.getAllSales();
  const sortedSales = sales.sort((a, b) => a.saleId - b.saleId);
  return { code: 200, json: sortedSales };
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listSaleById = async (id) => {
  const sales = await salesModel.getSaleById(id);
  const salesWithOutSaleId = sales.map((sale) => (
    {
      date: sale.date,
      productId: sale.productId,
      quantity: sale.quantity,
    }));
  
  if (!sales.length) return { code: 404, json: { message: 'Sale not found' } };

  if (sales.length > 1) return { code: 200, json: salesWithOutSaleId };
  
  return { code: 200, json: sales };
};
// Requisito 03
const validate = (productId, quantity) => {
  if (!productId) return { code: 400, message: '"productId" is required' };
  if (quantity < 1) {
    return {
    code: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  if (!quantity) return { code: 400, message: '"quantity" is required' };
  return {};
};
// Requisito 07 - Crie um endpoint para cadastrar vendas
const createNewSale = async (order) => {
  const { productId, quantity } = order[0];
  const validations = validate(productId, quantity);
  if (validations.message) {
    return { code: validations.code, json: { message: validations.message } };
  }

  const createdOrder = await salesModel.createSale(order);

  return { code: 201, json: createdOrder };
};

// Requisito 08 - Crie um endpoint para atualizar uma venda
const editSaleById = async ({ quantity, saleId, productId }) => {
  const validations = validate(productId, quantity);
  if (validations.message) {
    return { code: validations.code, json: { message: validations.message } };
  }

  const editedSale = await salesModel.editSaleById({ quantity, saleId, productId });
  return { code: 200, json: editedSale };
};

module.exports = {
  listAllSales,
  listSaleById,
  createNewSale,
  editSaleById,
};
