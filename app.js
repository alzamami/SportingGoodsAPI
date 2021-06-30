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

// Create
app.post("/products", (req, res) => {
  const id = products.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = {
    id,
    slug,
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update

app.listen(8000, () => {
  console.log("localhost:8000");
});
