const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color_id: {
    type: mongoose.Types.ObjectId,
    ref: "Color",
  },
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Size", sizeSchema);
