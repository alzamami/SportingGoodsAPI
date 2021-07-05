const slugify = require("slugify");
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
exports.deleteProduct = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else res.status(404).json({ message: "product not found" });
};
// Add a new products
exports.createProduct = (req, res) => {
  const id = products.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = {
    id,
    slug,
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};
// Update an Existing product
exports.updateProduct = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    //for loop so that it changes what I want to change and leaves the rest
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
