var ProductModel = require("../../models/ProductModel");
const ProductService = {
  add: async ({ title, author, introduction, detail, cover, editTime }) => {
    return ProductModel.create({
      title,
      author,
      introduction,
      detail,
      cover,
      editTime,
    });
  },
  getList: async ({ author, _id }) => {
    if (author) {
      return ProductModel.find({ author });
    } else if (_id) {
      return ProductModel.find({ _id });
    } else {
      return ProductModel.find();
    }
  },
  deleteList: async ({ _id }) => {
    return ProductModel.deleteOne({ _id });
  },
  updateList: async ({
    _id,
    title,
    author,
    introduction,
    detail,
    cover,
    editTime,
  }) => {
    console.log(editTime);
    if (cover) {
      return ProductModel.updateOne(
        { _id },
        { title, author, introduction, detail, cover, editTime }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        { title, author, introduction, detail, editTime }
      );
    }
  },
};
module.exports = ProductService;
