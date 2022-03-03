const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../controllers/listSales');

// describe('Controller listAllSales é chamado', () => {
//   let request = {}, response = {}, next = {};
//   describe('Não existem vendas no banco de dados', () => {
    
//     before(() => {
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//     });
//     // after(() => {
//     //   salesController.listAllSales.restore();
//     // });
//     // it('res.status() e chamado com status 200', async () => {
//     //   await salesController.listAllSales(request, response, next);
//     //   expect(response.status.calledWith(200)).to.be.equal(true);
//     // });
//   });
// });

describe('Controller listSaleById é chamado', () => {
  let request = {}, response = {}, next = {};
  describe('Não existem vendas no banco de dados', () => {
    
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    // after(() => {
    //   salesController.listSaleById.restore();
    // });
    it('res.status() e chamado com status 200', async () => {
      await salesController.listSaleById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});
