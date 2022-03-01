const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id;
  `);

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE id = ?;`, [id]);

  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};
