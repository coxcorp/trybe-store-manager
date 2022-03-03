const { expect } = require('chai');
const salesModel = require('../../../models/listSales');

describe('Listar todos as vendas', () => {
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
  it('O resultado deve ser um object', async () => {
    const product = await salesModel.editSaleById({ saleId: 1, productId: 1, quantity: 10 });

    expect(product).to.be.an('object');
  });
  it(`Objeto deve possuir as propriedades 'saleId', 'itemUpdated'`, async () => {
    const product = await salesModel.editSaleById({ saleId: 1, productId: 1, quantity: 10 });

      expect(product).to.have.keys('saleId', 'itemUpdated');
  });
});
