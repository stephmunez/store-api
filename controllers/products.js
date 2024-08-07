const getAllProductsStatic = async (req, res) => {
  throw new Error('testing async errors');
  res.send({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
  res.send({ msg: 'products route' });
};

module.exports = { getAllProductsStatic, getAllProducts };
