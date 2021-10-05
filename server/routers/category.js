const express = require("express");
const router = express.Router();

const {
  create,
  categoryId,
  list,
  update,
  remove,
  read,
  listChild,
} = require("../controllers/category");

router.post("/category", create);
router.get("/categories", list);
router.get("/category/:id", read);
router.put("/category/:id", update);
router.delete("/category/:id", remove);
router.get("/categories/child", listChild);

router.param("id", categoryId);

module.exports = router;
