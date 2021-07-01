const express = require("express");

const router = express.Router();
const {
  fetchProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./controllers");

//product routes
// List route
router.get("/", fetchProduct);

// Delete route
router.delete("/:productId", deleteProduct);

// Create
router.post("/", createProduct);

// Update
router.put("/:productId", updateProduct);

module.exports = router;
