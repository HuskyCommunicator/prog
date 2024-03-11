// 引入所需的模块
const NewsService = require("../../services/web/NewsService");

// 定义UserController对象
const NewsController = {
  getList: async (req, res) => {
    const result = await NewsService.getList({
      _id: req.params.id,
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getTopList: async (req, res) => {
    const result = await NewsService.getTopList({ limit: req.query.limit });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};

// 导出UserController模块
module.exports = NewsController;
