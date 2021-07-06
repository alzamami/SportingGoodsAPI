const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./API/product/routes");
const db = require("./db/models/index");

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("middleware method");
  next();
});
// Routes
app.use("/products", productRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
// path not found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});
const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connected Successfully");
    app.listen(8000, () => {
      console.log("localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
