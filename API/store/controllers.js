const { Store, Product } = require("../../db/models");

exports.fetchStore = async (storeId, next) => {
  try {
    const store = await Store.findByPk(storeId);
    return store;
  } catch (error) {
    next(error);
  }
};

exports.storeFetch = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      // attributes: ["name", "price"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Product,
        as: "products",
        attributes: ["id", "name"],
      },
    });
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newStore = await Store.create(req.body);
    res.status(201).json(newStore);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

// Add a new products
exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.storeId = req.store.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
