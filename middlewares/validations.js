// Requisito 03
const productsValidations = (name, quantity) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
  if (quantity < 1) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  if (!quantity) return { code: 400, message: '"quantity" is required' };
  return {};
};

const salesValidations = (productId, quantity) => {
  if (!productId) return { code: 400, message: '"productId" is required' };
  if (quantity < 1) {
    return {
    code: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  if (!quantity) return { code: 400, message: '"quantity" is required' };
  return {};
};

module.exports = {
  productsValidations,
  salesValidations,
};