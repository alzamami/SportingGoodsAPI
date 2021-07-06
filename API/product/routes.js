const express = require("express");

const router = express.Router();
const {
  productFetch,
  fetchProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./controllers");

//product routes
router.use((req, res, next) => {
  console.log("middleware method");
  next();
});

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("Product not found");
    error.status = 404;
    next(error);
  }
});
// List route
router.get("/", productFetch);

// Delete route
router.delete("/:productId", deleteProduct);

// Create
router.post("/", createProduct);

// Update
router.put("/:productId", updateProduct);

module.exports = router;
