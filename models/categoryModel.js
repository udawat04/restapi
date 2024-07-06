const mongoose = require("mongoose");
const { BASE_URL } = require("../config");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    title: { type: String },
    price: { type: Number },
    thumbnail: {
      type: String,
      get: (thumbnail) => {
        return `${BASE_URL}${thumbnail}`;
      },
    },
    thumbnail1: {
      type: String,
      get: (thumbnail1) => {
        return `${BASE_URL}${thumbnail1}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
