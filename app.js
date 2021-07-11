const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./API/product/routes");
const storeRoutes = require("./API/store/routes");
const userRoutes = require("./API/user/routes");
const db = require("./db/models/index");

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/products", productRoutes);
app.use("/stores", storeRoutes);
app.use(userRoutes);
app.use("/media", express.static("media"));

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});
// path not found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connected Successfully");
    app.listen(8000, () => {
      console.log("localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
