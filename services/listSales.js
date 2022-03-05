const salesModel = require('../models/listSales');
const validations = require('../middlewares/validations');
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
// Requisito 07 - Crie um endpoint para cadastrar vendas
const createNewSale = async (order) => {
  const { productId, quantity } = order[0];
  const validate = validations.salesValidations(productId, quantity);
  if (validate.message) {
    return { code: validate.code, json: { message: validate.message } };
  }

  const createdOrder = await salesModel.createSale(order);

  return { code: 201, json: createdOrder };
};

// Requisito 08 - Crie um endpoint para atualizar uma venda
const editSaleById = async ({ quantity, saleId, productId }) => {
  const validate = validations.salesValidations(productId, quantity);
  if (validate.message) {
    return { code: validate.code, json: { message: validate.message } };
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
