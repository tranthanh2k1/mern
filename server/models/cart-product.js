const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  order_id: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const CartProduct = mongoose.model("Cart_Product", cartProductSchema);

module.exports = CartProduct;
