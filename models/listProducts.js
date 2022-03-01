const connection = require('./connection');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');

  return products;
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
    );

  return product;
};
// Requisito 04 - Crie um endpoint para o cadastro de produtos
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
// Requisito 05 - Crie um endpoint para atualizar um produto
const editProduct = async (product) => {
  await connection.execute(
    `UPDATE
      StoreManager.products
    SET
      name = ?, quantity = ? WHERE id = ?`,
    [product.name, product.quantity, product.id],
  );

  return product;
};
// Requisito 06 - Crie um endpoint para deletar um produto
const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
    );
  };

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
