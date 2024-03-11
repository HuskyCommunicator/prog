const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===>user集合
const NewsType = {
  title: String, //标题
  author: String, //作者
  content: String, //内容
  category: Number, //类别  1 2 3
  cover: String, //封面
  isPublish: Number, //未发布 已发布
  role: Number, //权限 管理员1 编辑2
  editTime: Date, //编辑时间
};
const NewsModel = mongoose.model("news", new Schema(NewsType));
module.exports = NewsModel;
