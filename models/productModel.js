const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { BASE_URL } = require("../config");

const productSchema = new Schema(
  {
    subcategory: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String },
    price: { type:Number },
    image: {
      type: String,
      get: (image) => {
        return `${BASE_URL}${image}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
