const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    default: null,
  },
});

module.exports = mongoose.model("Color", colorSchema);
