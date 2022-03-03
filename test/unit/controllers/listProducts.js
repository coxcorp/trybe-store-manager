const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../controllers/listProducts');

describe('Controller listAllProducts é chamado', () => {
  let request = {}, response = {}, next = {};
  describe('Não existem compras no banco de dados', () => {
    
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    it('res.status() e chamado com status 200', async () => {
      await productsController.listAllProducts(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});
