// 引入所需的模块
const express = require("express"); // 引入Express.js库，一个用于构建web应用的框架
const NewsController = require("../../controller/web/NewsController"); // 引入UserController模块，这个模块包含了处理用户相关请求的方法

// 创建路由器
const NewsRouter = express.Router(); // 使用Express.js的Router方法创建一个新的路由器对象

//添加新闻
NewsRouter.get("/webapi/news/list", NewsController.getList);
NewsRouter.get("/webapi/news/list/:id", NewsController.getList);
NewsRouter.get("/webapi/news/toplist", NewsController.getTopList);
module.exports = NewsRouter;
