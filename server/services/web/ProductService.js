var ProductModel = require("../../models/ProductModel");
const ProductService = {
  getList: async ({ limit, _id }) => {
    if (_id) {
      return ProductModel.find({ _id });
    } else if (limit) {
      return ProductModel.find().limit(limit);
    } else {
      console.log("Service层接收到未知的请求参数");
    }
  },
};
module.exports = ProductService;
