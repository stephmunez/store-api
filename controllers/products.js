const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.send({ products, length: products.length });
};

const getAllProducts = async (req, res) => {
  // query
  let { featured, company, name, sort, fields, page, limit, numericFilters } =
    req.query;
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

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const options = ['price', 'rating'];
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');

      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value),
        };
      }
    });
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  // sort and select
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

  // skip and limit
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
