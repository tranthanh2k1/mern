const mongoose = require("mongoose");

const imgProductSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Img_product", imgProductSchema);
