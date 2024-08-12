const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price').limit(4).skip(1);
  res.send({ products, length: products.length });
};

const getAllProducts = async (req, res) => {
  let { featured, company, name, sort, fields, page, limit } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured.toLowerCase() === 'true';
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const { skip, limit: finalLimit } = getPagination(page, limit);

  result = result.skip(skip).limit(finalLimit);

  const products = await result;

  res.send({ products, length: products.length });
};

const getPagination = (page, limit) => {
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const skip = (page - 1) * limit;
  return { skip, limit };
};

module.exports = { getAllProductsStatic, getAllProducts };
