const express = require('express');
const productsController = require('../controllers/listProducts');
const salesController = require('../controllers/listSales');

const productRouter = express.Router();
const salesRouter = express.Router();

// Requisito 02 - Crie endpoints para listar os produtos e as vendas
productRouter.get('/', productsController.listAllProducts);
productRouter.get('/:id', productsController.listProductById);
// Requisito 04 - Crie um endpoint para o cadastro de produtos
productRouter.post('/', productsController.createNewProduct);
// Requisito 05 - Crie um endpoint para atualizar um produto
productRouter.put('/:id', productsController.editProductById);
// Requisito 06 - Crie um endpoint para deletar um produto
productRouter.delete('/:id', productsController.deleteProductById);

// Requisito 02 - Crie endpoints para listar os produtos e as vendas
salesRouter.get('/', salesController.listAllSales);
salesRouter.get('/:id', salesController.listSaleById);

// Requisito 07 - Crie um endpoint para cadastrar vendas
salesRouter.post('/');
// Requisito 08 - Crie um endpoint para atualizar uma venda
salesRouter.put('/:id');

module.exports = {
  productRouter,
  salesRouter,
};
