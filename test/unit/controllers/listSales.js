const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/listSales');
const salesService = require('../../../services/listSales');

describe('Listar todos as vendas', () => {
  describe('Quando não existe nenhuma venda', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'listAllSales').resolves([]);

    })
    after(() => {
      salesService.listAllSales.restore();
    })
    it('retorna um array', async () => {
      const result = await salesService.listAllSales();
      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await salesService.listAllSales();
      expect(result).to.be.empty;
    })
  })
});
