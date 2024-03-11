// 引入所需的模块
const express = require("express"); // 引入Express.js库，一个用于构建web应用的框架
const NewsController = require("../../controller/admin/NewsController"); // 引入UserController模块，这个模块包含了处理用户相关请求的方法

// 创建路由器
const NewsRouter = express.Router(); // 使用Express.js的Router方法创建一个新的路由器对象

//图片上传
const multer = require("multer"); // 引入multer库，一个用于处理multipart/form-data类型的POST请求（通常用于文件上传）的中间件
const upload = multer({ dest: "public/newsuploads/" });
//添加新闻
NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"),
  NewsController.add
);
//更新新闻
NewsRouter.post(
  "/adminapi/news/list",
  upload.single("file"),
  NewsController.updateList
);
//获取新闻列表
NewsRouter.get("/adminapi/news/list/author/:author", NewsController.getList);
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList);
//切换新闻显示状态
NewsRouter.put("/adminapi/news/publish", NewsController.publish);
NewsRouter.delete("/adminapi/news/list/:id", NewsController.deleteList);

module.exports = NewsRouter;
