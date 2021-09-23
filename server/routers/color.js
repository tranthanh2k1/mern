const express = require("express");
const { create, list, remove, colorId } = require("../controllers/color.js");

const router = express.Router();

router.post("/color", create);
router.get("/colors", list);
router.delete("/color/:id", remove);

router.param("id", colorId);

module.exports = router;
