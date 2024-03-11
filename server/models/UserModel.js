const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===>user集合
const UserType = {
  username: String,
  password: String,
  gender: Number, //性别 0 1 2
  introduction: String, //介绍
  avatar: String, //头像
  role: Number, //权限 管理员1 编辑2
};
const UserModel = mongoose.model("user", new Schema(UserType));
module.exports = UserModel;
