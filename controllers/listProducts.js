const productsModel = require('../models/listProducts');

const listAllProducts = async (req, res) => {
  const products = await productsModel.getAllProducts();
  const sortedProducts = products.sort((a, b) => a.name - b.name);
  return res.status(200).json(sortedProducts);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const products = await productsModel.getAllProducts();
  const productById = products.find((product) => product.id === Number(id));

  if (!productById) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(productById);
};

module.exports = {
  listAllProducts,
  listProductById,
};
