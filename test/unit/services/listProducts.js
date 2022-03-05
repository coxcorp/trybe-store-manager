const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/listProducts');
const productsService = require('../../../services/listProducts');
describe('Listar todos os produtos', () => {
  describe('Quando não existe nenhum produto', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves([]);
    })
    after(() => {
      productsModel.getAllProducts.restore();
    })
    it('retorna um array', async () => {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.an('array');
    })
    it('retorna um array vazio', async () => {
      const result = await productsModel.getAllProducts();
      expect(result).to.be.empty;
    })
  })
});