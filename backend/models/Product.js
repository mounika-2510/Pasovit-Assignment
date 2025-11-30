const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    price: Number,
    sizes: [String],
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
