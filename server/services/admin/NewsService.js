var NewsModel = require("../../models/NewsModel");
const NewsService = {
  add: async ({
    title,
    content,
    category,
    isPublish,
    cover,
    editTime,
    author,
  }) => {
    return NewsModel.create({
      title,
      content,
      category,
      isPublish,
      cover,
      editTime,
      author,
    });
  },
  updateList: async ({
    title,
    content,
    category,
    isPublish,
    cover,
    editTime,
    _id,
  }) => {
    if (cover) {
      return NewsModel.updateOne(
        {
          _id,
        },
        {
          title,
          content,
          category,
          isPublish,
          cover,
          editTime,
        }
      );
    } else {
      return NewsModel.updateOne(
        {
          _id,
        },
        {
          title,
          content,
          category,
          isPublish,

          editTime,
        }
      );
    }
  },
  getList: async ({ author, _id }) => {
    if (_id) {
      return NewsModel.find({ _id });
    } else {
      return NewsModel.find({ author });
    }
  },
  publish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      { _id },
      {
        isPublish,
        editTime,
      }
    );
  },
  deleteList: async ({ _id }) => {
    return NewsModel.deleteOne({ _id });
  },
};
module.exports = NewsService;
