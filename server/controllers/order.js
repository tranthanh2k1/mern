const Order = require("../models/order.js");
const CartProduct = require("../models/cart-product.js");

exports.saveOrder = async (req, res) => {
  const {
    username,
    address,
    phone,
    paymentMethod,
    cartProduct,
    intoMoney,
    user_id,
  } = req.body;

  const newOrder = new Order({
    username,
    address,
    phone,
    status: "WAIT PROGRESS",
    paymentMethod,
    intoMoney,
    user_id,
  });

  const saveOrder = await newOrder.save();

  cartProduct.map((item) => {
    const newCartProduct = new CartProduct({
      product_name: item.name,
      product_price: item.price,
      product_image: item.image,
      product_quantity: item.qty,
      order_id: saveOrder._id,
    });

    newCartProduct.save();
  });

  res.status(200).json({
    success: true,
    message: "Bạn đã đặt hàng thành công",
  });
};
