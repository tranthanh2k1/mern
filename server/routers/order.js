const express = require("express");
const router = express.Router();

const { saveOrder } = require("../controllers/order");

router.post("/order", saveOrder);

module.exports = router;
