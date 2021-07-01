const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./API/product/routes");

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/products", productRoutes);
app.listen(8000, () => {
  console.log("localhost:8000");
});
