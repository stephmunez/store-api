const getAllProductsStatic = async (req, res) => {
  res.send({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
  res.send({ msg: 'products route' });
};

module.exports = { getAllProductsStatic, getAllProducts };
