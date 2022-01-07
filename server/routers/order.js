const express = require("express");
const router = express.Router();

const {
  saveOrder,
  listAllOrder,
  updateStatusOrderAdmin,
  orderDetail,
  listAllOrderStatus,
  searchOrderAdmin,
  filterByDate,
  revenueByDay,
  revenueByDays,
  monthlyRevenue,
  listAllOrderUser,
  listOrderStatusUser,
  cancelOrderUser,
  businessResults,
} = require("../controllers/order");
const { verifyToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/auth");

// user
router.post("/order", saveOrder);
router.get("/order/user/all", verifyToken, listAllOrderUser);
router.post("/order/user/status", verifyToken, listOrderStatusUser);
router.put("/order/user/cancel/:orderId", verifyToken, cancelOrderUser);

// admin
router.get("/orderListAll", listAllOrder);
router.get("/order/detail/:orderId", orderDetail);
router.put(
  "/order/adminUpdateStatus/:orderId",
  verifyToken,
  isAdmin,
  updateStatusOrderAdmin
);
router.post("/order/status", listAllOrderStatus);
router.get("/order/admin/search", verifyToken, isAdmin, searchOrderAdmin);
router.post("/order/filterByDate", filterByDate);
router.post("/order/revenueByDay", revenueByDay);
router.post("/order/revenueByDays", revenueByDays);
// router.post("/order/monthlyRevenue", monthlyRevenue);
router.post("/order/businessResults", businessResults);

module.exports = router;
