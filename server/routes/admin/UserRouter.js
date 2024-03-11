// 引入所需的模块
const express = require("express"); // 引入Express.js库，一个用于构建web应用的框架
const UserController = require("../../controller/admin/UserController"); // 引入UserController模块，这个模块包含了处理用户相关请求的方法

// 创建路由器
const UserRouter = express.Router(); // 使用Express.js的Router方法创建一个新的路由器对象

//图片上传
const multer = require("multer"); // 引入multer库，一个用于处理multipart/form-data类型的POST请求（通常用于文件上传）的中间件
const upload = multer({ dest: "public/avataruploads/" }); // 使用multer创建一个新的中间件，设置上传文件的存储位置为"public/avataruploads/"
//登录接口
UserRouter.post("/adminapi/user/login", UserController.login);
//个人中心-个人信息接口
UserRouter.post(
  "/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);
//用户管理-添加用户接口
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"),
  UserController.add
);
//用户管理-用户列表接口
UserRouter.get("/adminapi/user/list", UserController.getList);
UserRouter.get("/adminapi/user/list/:id", UserController.getList);
UserRouter.put("/adminapi/user/list/:id", UserController.putList);
//用户管理-用户列表接口
UserRouter.delete("/adminapi/user/list/:id", UserController.deleteList);
// 导出UserRouter模块
module.exports = UserRouter;
