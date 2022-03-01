const express = require('express');
const productsController = require('../controllers/listProducts');

const productRouter = express.Router();

// Requisito 02 - Crie endpoints para listar os produtos e as vendas
productRouter.get('/', productsController.listAllProducts);
productRouter.get('/:id', productsController.listProductById);
// Requisito 04 - Crie um endpoint para o cadastro de produtos
productRouter.post('/', productsController.createNewProduct);
// Requisito 05 - Crie um endpoint para atualizar um produto
productRouter.put('/:id', productsController.editProductById);
// Requisito 06 - Crie um endpoint para deletar um produto
productRouter.delete('/:id', productsController.deleteProductById);

module.exports = {
  productRouter,
};
