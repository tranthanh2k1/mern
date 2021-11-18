const express = require("express");
const router = express.Router();

const {
  saveOrder,
  listAllOrder,
  updateStatusOrderAdmin,
  orderDetail,
} = require("../controllers/order");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/auth");

// user
router.post("/order", saveOrder);

// admin
router.get("/orderListAll", listAllOrder);
router.get("/order/detail/:orderId", orderDetail);
router.put(
  "/order/adminUpdateStatus/:orderId",
  verifyToken,
  isAdmin,
  updateStatusOrderAdmin
);

module.exports = router;
