const express = require("express");
const ProductController = require("../../controller/admin/ProductController");
const ProductRouter = express.Router();
//图片上传
const multer = require("multer"); // 引入multer库，一个用于处理multipart/form-data类型的POST请求（通常用于文件上传）的中间件
const upload = multer({ dest: "public/productsuploads/" });
//添加产品
ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"),
  ProductController.add
);
//更新产品
ProductRouter.post(
  "/adminapi/product/list",
  upload.single("file"),
  ProductController.updateList
);
//获取产品-根据作者-进行个人产品查看
ProductRouter.get(
  "/adminapi/product/list/author/:author",
  ProductController.getList
);
//获取产品-根据id-进行单独修改
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList);
ProductRouter.delete(
  "/adminapi/product/list/:id",
  ProductController.deleteList
);
//获取产品-常规
ProductRouter.get("/adminapi/product/list/", ProductController.getList);
ProductRouter.delete(
  "/adminapi/product/list/:id",
  ProductController.deleteList
);
module.exports = ProductRouter;
