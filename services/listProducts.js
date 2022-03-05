const productsModel = require('../models/listProducts');
const validations = require('../middlewares/validations');

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
// Requisito 04 - Crie um endpoint para o cadastro de produtos
const createNewProduct = async ({ name, quantity }) => {
  // const { name, quantity } = newProduct;
  const validate = validations.productsValidations(name, quantity);
    if (validate.message) {
      return { code: validate.code, json: { message: validate.message } };
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

  const validate = validations.productsValidations(name, quantity);
  if (validate.message) {
    return { code: validate.code, json: { message: validate.message } };
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
