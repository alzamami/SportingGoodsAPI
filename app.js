const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./API/product/routes");
const db = require("./db/models/index");

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/products", productRoutes);

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
