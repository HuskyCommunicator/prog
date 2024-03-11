//express后端框架创建流程
//安装Express
//npm i express - g
//express 项目名称
//npm install
//新建controller service models文件夹
//routes中配置接口路由
//xxRouter
const express = require("express");
const xxController = require("../../controller/admin/xxController");
const xxRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/productsuploads/" });
ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"),
  xxController.add
);
module.exports = xxRouter;
//appjs导入router
const xxRouter = require("./routes/admin/xxRouter");
app.use(xxRouter);
//xxController
const xxService = require("../../services/admin/xxService");
const xxController = {
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
};
module.exports = xxController;
/*增
将req.body的数据进行解构暴露
await
*/
