const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/listSales');

describe('Listar todos as vendas', () => {
  const sales = [
    {
      "saleId": 1,
      "date": "2022-03-04T03:05:16.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2022-03-04T03:05:16.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-03-04T03:05:16.000Z",
      "productId": 3,
      "quantity": 15
    }
  ]

  before(() => {
    sinon.stub(connection, 'execute').resolves([sales], []);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um array', async () => {
    const sales = await salesModel.getAllSales();

    expect(sales).to.be.an('array');
  });
  it(`Cada objeto no array deve possuir as propriedades 'saleId', 'date', 'productId', 'quantity'`, async () => {
    const sales = await salesModel.getAllSales();

    sales.forEach(sale => {
      expect(sale).to.have.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Obter vendas por id', () => {
  const sales = [
    {
      "saleId": 1,
      "date": "2022-03-04T03:05:16.000Z",
      "productId": 1,
      "quantity": 5
    }
  ]
  before(() => {
    sinon.stub(connection, 'execute').resolves([sales], []);
  });

  after(() => {
    connection.execute.restore();
  });


  it('O resultado deve ser um array', async () => {
    const sales = await salesModel.getSaleById(1);

    expect(sales).to.be.an('array');
  });
  it(`Cada objeto no array deve possuir as propriedades 'saleId', 'date', 'productId', 'quantity'`, async () => {
    const sales = await salesModel.getSaleById(1);

    sales.forEach(sale => {
      expect(sale).to.have.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Cadastra vendas', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[{ insertId: 3}], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um object', async () => {
    const product = await salesModel.createSale([{"productId": 1, "quantity": 3 }]);

    expect(product).to.be.an('object');
  });
  it(`Objeto deve possuir as propriedades 'id', 'itemsSold'`, async () => {
    const product = await salesModel.createSale([{"productId": 1, "quantity": 3 }]);

      expect(product).to.have.keys('id', 'itemsSold');
  });
});

describe('Edita vendas', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um object', async () => {
    const product = await salesModel.editSaleById({ saleId: 1, productId: 1, quantity: 10 });

    expect(product).to.be.an('object');
  });
  it(`Objeto deve possuir as propriedades 'saleId', 'itemUpdated'`, async () => {
    const product = await salesModel.editSaleById({ saleId: 1, productId: 1, quantity: 10 });

      expect(product).to.have.keys('saleId', 'itemUpdated');
  });
});

[
	{
		"saleId": 1,
		"date": "2022-03-04T03:05:16.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"saleId": 1,
		"date": "2022-03-04T03:05:16.000Z",
		"productId": 2,
		"quantity": 10
	},
	{
		"saleId": 2,
		"date": "2022-03-04T03:05:16.000Z",
		"productId": 3,
		"quantity": 15
	}
]