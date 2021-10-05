const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price_default: {
      type: Number,
      required: true,
    },
    price_sale: {
      type: Number,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
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
      type: Array,
      default: [],
    },
    size: {
      type: Array,
      default: [],
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
