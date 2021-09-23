const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_default: {
      type: String,
      required: true,
    },
    price_sale: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    image_default: {
      type: Array,
      default: [],
    },
    quantity: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
