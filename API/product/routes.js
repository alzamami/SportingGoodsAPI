const express = require("express");

const router = express.Router();
const {
  productFetch,
  fetchProduct,
  deleteProduct,
  updateProduct,
} = require("./controllers");

const multer = require("multer");

//product routes
router.use((req, res, next) => {
  // console.log("middleware method");
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
// multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// List route
router.get("/", productFetch);

// Delete route
router.delete("/:productId", deleteProduct);

// Update
router.put("/:productId", upload.single("image"), updateProduct);

module.exports = router;
