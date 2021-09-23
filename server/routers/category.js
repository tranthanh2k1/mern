const express = require("express");
const router = express.Router();

const {
  create,
  categoryId,
  list,
  update,
  remove,
  read,
} = require("../controllers/category");

router.post("/category", create);
router.get("/categories", list);
router.get("/category/:id", read);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

router.param("id", categoryId);

module.exports = router;
