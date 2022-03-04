const productsModel = require('../models/listProducts');
const productsService = require('../services/listProducts');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const listAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(products.code).json(products.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas 
const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(Number(id));
  
    return res.status(product.code).json(product.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 04 - Crie um endpoint para o cadastro de produtos
const createNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const createdProduct = await productsService.createNewProduct({ name, quantity });

    return res.status(createdProduct.code).json(createdProduct.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 05 - Crie um endpoint para atualizar um produto
const editProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const editedProduct = await productsService.editProductById({ id: Number(id), name, quantity });

    return res.status(editedProduct.code).json(editedProduct.json);
  } catch (e) {
    next(e);
  }
};
// Requisito 06 - Crie um endpoint para deletar um produto
const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsModel.getProductById(Number(id));
  
    if (!product.length) return res.status(404).json({ message: 'Product not found' });

    await productsModel.deleteProduct(id);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllProducts,
  listProductById,
  createNewProduct,
  editProductById,
  deleteProductById,
};
