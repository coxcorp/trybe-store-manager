const productsModel = require('../models/listProducts');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  const sortedProducts = products.sort((a, b) => a.name - b.name);
  return { code: 200, json: sortedProducts };
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getProductById = async (id) => {
  const product = await productsModel.getProductById(Number(id));

  if (!product.length) return { code: 404, json: { message: 'Product not found' } };

  return { code: 200, json: product[0] };
};

// Requisito 03
const validate = (name, quantity) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
  if (quantity < 1) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  if (!quantity) return { code: 400, message: '"quantity" is required' };
  return {};
};
// Requisito 04 - Crie um endpoint para o cadastro de produtos
const createNewProduct = async ({ name, quantity }) => {
  const validations = validate(name, quantity);
    if (validations.message) {
      return { code: validations.code, json: { message: validations.message } };
    }

  const products = await productsModel.getAllProducts();
  const notUnique = products.find((product) => product.name === name);
    if (notUnique) return { code: 409, json: { message: 'Product already exists' } };

  const createdProduct = await productsModel.createProduct({ name, quantity });

  return { code: 201, json: createdProduct };
};
// Requisito 05 - Crie um endpoint para atualizar um produto
const editProductById = async ({ id, name, quantity }) => {
  const product = await productsModel.getProductById(Number(id));

  if (!product.length) return { code: 404, json: { message: 'Product not found' } };

  const validations = validate(name, quantity);
  if (validations.message) {
    return { code: validations.code, json: { message: validations.message } };
  }

  const editedProduct = await productsModel.editProduct({ id: Number(id), name, quantity });

  return { code: 200, json: editedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  editProductById,
};
