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
    const foundStore = await Store.findOne({
      where: { userId: req.user.id },
    });
    if (foundStore) {
      const err = new Error("You Already have a store");
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
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
    if (req.user.id === req.store.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.storeId = req.store.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      const err = new Error("unauth ");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
