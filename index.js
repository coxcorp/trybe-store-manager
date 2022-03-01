require('dotenv').config();
const express = require('express');
const routers = require('./routes/router');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', routers.productRouter);
app.use('/sales', routers.salesRouter);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
