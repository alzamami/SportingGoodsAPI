const express = require("express");

const router = express.Router();
const {
  storeFetch,
  createStore,
  createProduct,
  fetchStore,
} = require("./controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

router.param("storeId", async (req, res, next, storeId) => {
  const store = await fetchStore(storeId, next);
  if (store) {
    req.store = store;
    next();
  } else {
    const error = new Error("Store not found");
    error.status = 404;
    next(error);
  }
});

router.get("/", storeFetch);

// Create

router.post("/", upload.single("image"), createStore);

router.post("/:storeId/products", upload.single("image"), createProduct);

module.exports = router;
