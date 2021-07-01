let products = require("../../data");
const slugify = require("slugify");

exports.fetchProduct = (req, res) => {
  res.json(products);
};

exports.deleteProduct = (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else res.status(404).json({ message: "product not found" });
};

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
