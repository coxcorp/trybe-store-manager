const productsModel = require('../models/listProducts');

const listAllProducts = async (req, res, next) => {
  try {
    const products = await productsModel.getAllProducts();
    const sortedProducts = products.sort((a, b) => a.name - b.name);
    return res.status(200).json(sortedProducts);
  } catch (e) {
    next(e);
  }
};

const listProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productsModel.getAllProducts();
    const productById = products.find((product) => product.id === Number(id));
  
    if (!productById) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json(productById);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listAllProducts,
  listProductById,
};
