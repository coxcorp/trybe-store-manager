const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/listProducts');

describe('Listar todos os produtos', () => {
  const products = [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América",
      "quantity": 30
    }
  ]

  before(() => {
    sinon.stub(connection, 'execute').resolves([products], []);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um array', async () => {
    const products = await productsModel.getAllProducts();

    expect(products).to.be.an('array');
  });
  it(`Cada objeto no array deve possuir as propriedades 'id', 'name' e 'quantity'`, async () => {
    const products = await productsModel.getAllProducts();

    products.forEach(product => {
      expect(product).to.have.keys('id', 'name', 'quantity');
    });
  });
});

describe('Obter produto por id', () => {
  const product = [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }
  ]
  before(() => {
    sinon.stub(connection, 'execute').resolves([product], []);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um array', async () => {
    const product = await productsModel.getProductById(1);

    expect(product).to.be.an('array');
  });
  it(`Objeto deve possuir as propriedades 'id', 'name' e 'quantity'`, async () => {
    const product = await productsModel.getProductById(1);

    product.forEach(product => {
      expect(product).to.have.keys('id', 'name', 'quantity');
    });
  });
});

describe('Cadastra produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[{ insertId: 4}], []]);
    });

    after(() => {
      connection.execute.restore();
    });
  it('O resultado deve ser um object', async () => {
    const product = await productsModel.createProduct({ "name": "produto", "quantity": 10 });

    expect(product).to.be.an('object');
  });
  it(`Objeto deve possuir as propriedades 'id', 'name' e 'quantity'`, async () => {
    const product = await productsModel.createProduct({ "name": "produto", "quantity": 10 });

      expect(product).to.have.keys('id', 'name', 'quantity');
  });
});

describe('Edita produtos', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[], []]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('O resultado deve ser um object', async () => {
    const product = await productsModel.editProduct({ "id": 1, "name": "Martelo de Thor", "quantity": 15 });

    expect(product).to.be.an('object');
  });
  it(`Objeto deve possuir as propriedades 'id', 'name' e 'quantity'`, async () => {
    const product = await productsModel.editProduct({ "id": 1, "name": "Martelo de Thor", "quantity": 15 });

      expect(product).to.have.keys('id', 'name', 'quantity');
  });
});

// [
// 	{
// 		"id": 1,
// 		"name": "Martelo de Thor",
// 		"quantity": 10
// 	},
// 	{
// 		"id": 2,
// 		"name": "Traje de encolhimento",
// 		"quantity": 20
// 	},
// 	{
// 		"id": 3,
// 		"name": "Escudo do Capitão América",
// 		"quantity": 30
// 	}
// ]