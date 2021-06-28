const express = require("express");
const products = require("./data");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/products", (req, res) => {
  res.json(products);
});
app.listen(8000, () => {
  console.log("localhost:8000");
});
