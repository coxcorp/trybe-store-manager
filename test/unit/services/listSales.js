const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/listSales');
const salesService = require('../../../services/listSales');

describe('Listar todos as vendas', () => {
  describe('Quando não existe nenhuma venda', () => {
    before(() => {
      sinon.stub(salesModel, 'getAllSales').resolves([]);
    })
    after(() => {
      salesModel.getAllSales.restore();
    })
    it('retorna um array', async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.empty;
    })
  })
});
