const connection = require('./connection');
// Requisito 02
const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id;
  `);

  return sales;
};
// Requisito 02
const getSaleById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE id = ?;`, [id]);

  return sale;
};
// Requisito 07
const createSale = async (order) => {
  const [newSaleId] = await connection.execute(`
  INSERT INTO StoreManager.sales (date) VALUE (NOW());`);

  await order.forEach((item) => {
    connection.execute(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES(?, ?, ?);`,
    [newSaleId.insertId, item.productId, item.quantity]);
  });
  return {
    id: newSaleId.insertId,
    itemsSold: order,
  };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
