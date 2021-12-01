const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    code_bill: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    intoMoney: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PROCESSING", "DELIVERING", "RECEIVED", "CANCELLED"],
      default: "PROCESSING",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updated_delivering: {
      type: Date,
      default: null,
    },
    updated_received: {
      type: Date,
      default: null,
    },
    updated_cancelled: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
