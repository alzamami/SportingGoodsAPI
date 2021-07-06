const { Product } = require("../../db/models");

exports.fetchProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      // attributes: ["name", "price"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete an Existing product
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else res.status(404).json({ message: "product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a new products
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // const id = products.length + 1;
  // const slug = slugify(req.body.name, { lower: true });
  // const newProduct = {
  //   id,
  //   slug,
  //   ...req.body,
  // };
  // products.push(newProduct);
  // res.status(201).json(newProduct);
};
// Update an Existing product
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const foundProduct = await Product.findByPk(productId);

  try {
    if (foundProduct) {
      //for loop so that it changes what I want to change and leaves the rest
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
