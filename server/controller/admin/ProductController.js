const ProductService = require("../../services/admin/ProductService");
const ProductController = {
  add: async (req, res) => {
    const cover = req.file ? `/productsuploads/${req.file.filename}` : "";
    const { title, author, introduction, detail } = req.body;
    await ProductService.add({
      title,
      author,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await ProductService.getList({
      _id: req.params.id,
      author: req.params.author,
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  deleteList: async (req, res) => {
    await ProductService.deleteList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/productsuploads/${req.file.filename}` : "";
    const { _id, title, author, introduction, detail } = req.body;
    await ProductService.updateList({
      _id,
      title,
      author,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = ProductController;
