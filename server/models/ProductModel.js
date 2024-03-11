const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductType = {
  title: String,
  author: String,
  introduction: String,
  detail: String,
  cover: String,
  editTime: Date,
};
const ProductModel = mongoose.model("products", new Schema(ProductType));
module.exports = ProductModel;
