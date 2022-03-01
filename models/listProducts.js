const connection = require('./connection');
// Requisito 02
const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');

  return products;
};
// Requisito 02
const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
    );

  return product;
};
// Requisito 06
const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
    );
  };
// Requisito 04
const createProduct = async (product) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [product.name, product.quantity],
  );

  return {
    id: newProduct.insertId,
    ...product,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
};
