const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.send({ products, length: products.length });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.send({ products, length: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
