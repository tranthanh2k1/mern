const express = require("express");
const router = express.Router();

const {
  productId,
  create,
  list,
  update,
  remove,
  detail,
  getProductColor,
  getProductImage,
  getProductSize,
} = require("../controllers/product");

router.post("/product", create);
router.get("/products", list);
router.get("/product/:id", detail);
router.put("/product/:id", update);
router.delete("/product/:id", remove);

router.get("/product/:id/image", getProductImage);
router.get("/product/:id/color", getProductColor);
router.get("/product/:id/size", getProductSize);

router.param("id", productId);

module.exports = router;
