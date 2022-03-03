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
    // after(() => {
    //   productsController.listAllProducts.restore();
    // });
    it('res.status() e chamado com status 200', async () => {
      await productsController.listAllProducts(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

// describe('Controller listProductById é chamado', () => {
//   let request = {}, response = {}, next = {};
//   describe('Não existem vendas no banco de dados', () => {
    
//     before(() => {
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//     });
//     // after(() => {
//     //   productsController.listProductById.restore();
//     // });
//     // it('res.status() e chamado com status 200', async () => {
//     //   await productsController.listProductById(request, response, next);
//     //   expect(response.status.calledWith(200)).to.be.equal(true);
//     // });
//   });
// });
