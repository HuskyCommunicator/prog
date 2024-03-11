// 引入所需的模块
const ProductService = require("../../services/web/ProductService");

// 定义ProductController对象
const ProductController = {
  getList: async (req, res) => {
    const result = await ProductService.getList({
      _id: req.params.id,
      limit: req.query.limit,
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};

// 导出UserController模块
module.exports = ProductController;
