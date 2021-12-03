const dummyGenerator = require("../utils/dummy-data-generator");

module.exports = {
  categories: dummyGenerator.getCategories(),
  products: dummyGenerator.getProducts(),
};
