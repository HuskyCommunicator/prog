// 引入所需的模块
const NewsService = require("../../services/admin/NewsService");
const moment = require("moment-timezone");
const beijingTime = moment().tz("Asia/Shanghai").format("YYYY/MM/DD/HH:mm");
// 定义UserController对象
const NewsController = {
  add: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish, author } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: beijingTime,
      author,
    });
    res.send({
      ActionType: "OK",
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish, _id, author } = req.body;

    await NewsService.updateList({
      _id,
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: beijingTime,
      author,
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList({
      _id: req.params.id,
      author: req.params.author,
    });

    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  publish: async (req, res) => {
    await NewsService.publish({
      ...req.body,
      editTime: beijingTime,
    });
    res.send({
      ActionType: "OK",
    });
  },
  deleteList: async (req, res) => {
    const result = await NewsService.deleteList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
};

// 导出UserController模块
module.exports = NewsController;
