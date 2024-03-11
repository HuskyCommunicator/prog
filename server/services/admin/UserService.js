var UserModel = require("../../models/UserModel");
const UserService = {
  login: async ({ username, password }) => {
    try {
      //利用模型查询 返回数组
      return UserModel.find({
        username,
        password,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  upload: async ({
    _id,
    username,
    password,
    role,
    introduction,
    gender,
    avatar,
  }) => {
    //进行数据库更新的操作
    if (avatar) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          password,
          role,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          password,
          role,
          introduction,
          gender,
        }
      );
    }
  },
  add: async ({
    // _id,
    username,
    password,
    role,
    gender,
    introduction,
    avatar,
  }) => {
    return UserModel.create({
      username,
      password,
      role,
      gender,
      introduction,
      avatar,
    });
  },
  getList: async ({ id }) => {
    return id
      ? UserModel.find({ _id: id }, [
          "username",
          "role",
          "introduction",
          "password",
        ])
      : UserModel.find({}, [
          "username",
          "role",
          "gender",
          "introduction",
          "avatar",
        ]);
  },
  deleteList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  putList: async (body) => {
    return UserModel.updateOne({ _id: body._value._id }, body._value);
  },
};
module.exports = UserService;
