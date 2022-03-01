require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/listProducts');
const salesController = require('./controllers/listSales');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 02 - Crie endpoints para listar os produtos e as vendas
app.get('/products', productsController.listAllProducts);
app.get('/products/:id', productsController.listProductById);
app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.listSaleById);

// Requisito 04 - Crie um endpoint para o cadastro de produtos
app.post('/products', productsController.createNewProduct);
// Requisito 05 - Crie um endpoint para atualizar um produto
app.put('/products/:id', productsController.editProductById);
// Requisito 06 - Crie um endpoint para deletar um produto
app.delete('/products/:id', productsController.deleteProductById);
// Requisito 07 - Crie um endpoint para cadastrar vendas
app.post('/sales');
// Requisito 08 - Crie um endpoint para atualizar uma venda
app.put('/sales/:id');

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
