const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.send({ products, length: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured.toLowerCase() === 'true';
  }

  console.log(queryObject);

  const products = await Product.find(queryObject);
  res.send({ products, length: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
