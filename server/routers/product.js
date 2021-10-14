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
  getProductSale,
  getProductCateChild,
  listRelated,
} = require("../controllers/product");

router.post("/product", create);
router.get("/products", list);
router.get("/product/:id", detail);
router.put("/product/:id", update);
router.delete("/product/:id", remove);

// get product sale
router.get("/products/sale", getProductSale);
// get product of cate child
router.get("/products/catechild/:cateId", getProductCateChild);

router.get("/product/:id/image", getProductImage);
router.get("/product/:id/color", getProductColor);
router.get("/product/:id/size", getProductSize);

// get products listRelate
router.get("/products/related/:id", listRelated);

router.param("id", productId);

module.exports = router;
