const { Product } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productFetch = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // attributes: ["name", "price"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
// Delete an Existing product
exports.deleteProduct = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
// Add a new products
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
// Update an Existing product
exports.updateProduct = async (req, res, next) => {
  try {
    //for loop so that it changes what I want to change and leaves the rest
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
