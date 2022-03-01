require('dotenv').config();
const express = require('express');
const routers = require('./routes/router');
const salesController = require('./controllers/listSales');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', routers.productRouter);
// Requisito 02 - Crie endpoints para listar os produtos e as vendas
app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.listSaleById);

// Requisito 07 - Crie um endpoint para cadastrar vendas
app.post('/sales');
// Requisito 08 - Crie um endpoint para atualizar uma venda
app.put('/sales/:id');

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
