require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/listProducts');
const salesController = require('./controllers/listSales');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 02
app.get('/products', productsController.listAllProducts);
app.get('/products/:id', productsController.listProductById);
app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.listSaleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
