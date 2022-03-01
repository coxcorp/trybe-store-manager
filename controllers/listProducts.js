const productsModel = require('../models/listProducts');
// Requisito 02
const listAllProducts = async (req, res, next) => {
  try {
    const products = await productsModel.getAllProducts();
    const sortedProducts = products.sort((a, b) => a.name - b.name);
    return res.status(200).json(sortedProducts);
  } catch (e) {
    next(e);
  }
};
// Requisito 02
const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsModel.getProductById(Number(id));
  
    if (!product.length) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json(product[0]);
  } catch (e) {
    next(e);
  }
};
// Requisito 06
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
// Requisito 04
const createNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const products = await productsModel.getAllProducts();
    const notUnique = products.find((product) => product.name === name);
    if (notUnique) return res.status(409).json({ message: 'Product already exists' });

    const createdProduct = await productsModel.createProduct({ name, quantity });

    return res.status(201).json(createdProduct);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllProducts,
  listProductById,
  deleteProductById,
  createNewProduct,
};
