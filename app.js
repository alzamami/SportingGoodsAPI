const express = require("express");
let products = require("./data");
const bodyParser = require("body-parser");
const cors = require("cors");
const slugify = require("slugify");

const app = express();

app.use(cors());
app.use(bodyParser.json());
//product routes
// List route
app.get("/products", (req, res) => {
  res.json(products);
});

// Delete route
app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);

  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
  } else res.status(404).json({ message: "product not found" });
});

app.post("/products", (req, res) => {
  const productId = products.length + 1;
  const productSlug = slugify(req.body.name);
});

app.listen(8000, () => {
  console.log("localhost:8000");
});
