const connection = require('./connection');
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id;
  `);

  return sales;
};
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
const getSaleById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales_products AS sp
  JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE id = ?;`, [id]);

  return sale;
};
// Requisito 07 - Crie um endpoint para cadastrar vendas
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
// Requisito 08 - Crie um endpoint para atualizar uma venda
const editSaleById = async (sale) => {
  await connection.execute(
    `UPDATE
      StoreManager.sales_products
    SET
      quantity = ?
    WHERE
      sale_id = ? AND product_id = ?;`,
    [sale.quantity, sale.saleId, sale.productId],
  );

  return {
    saleId: sale.saleId,
    itemUpdated: [
      {
        productId: sale.productId,
        quantity: sale.quantity,
      },
    ],
  };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  editSaleById,
};
