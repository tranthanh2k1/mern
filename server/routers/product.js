const express = require("express");
const router = express.Router();

const {
  productId,
  create,
  list,
  update,
  remove,
  detail,
} = require("../controllers/product");

router.post("/product", create);
router.get("/products", list);
router.get("/product/:id", detail);
router.put("/product/:id", update);
router.delete("/product/:id", remove);

router.param("id", productId);

module.exports = router;
