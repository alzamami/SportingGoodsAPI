const { Product, Store } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productFetch = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // attributes: ["name", "price"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Store,
        as: "store",
        attributes: ["name"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
// Delete an Existing product
exports.deleteProduct = async (req, res, next) => {
  const foundStore = await Store.findByPk(req.product.storeId);
  // await console.log(foundStore.userId);
  try {
    if (foundStore.userId === req.user.id) {
      await req.product.destroy();
      res.status(204).end();
    } else {
      const err = new Error("unauth ");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Update an Existing product
exports.updateProduct = async (req, res, next) => {
  const foundStore = await Store.findByPk(req.product.storeId);

  try {
    if (foundStore.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedProduct = await req.product.update(req.body);
      res.json(updatedProduct);
    } else {
      const err = new Error("unauth ");
      err.status = 401;
      return next(err);
    }

    //for loop so that it changes what I want to change and leaves the rest
  } catch (error) {
    next(error);
  }
};
