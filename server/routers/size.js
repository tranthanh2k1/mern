const express = require("express");
const { create, list, remove, sizeId } = require("../controllers/size.js");

const router = express.Router();

router.post("/size", create);
router.get("/sizes", list);
router.delete("/size/:id", remove);

router.param("id", sizeId);

module.exports = router;
