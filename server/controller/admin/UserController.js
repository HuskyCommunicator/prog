// 引入所需的模块
const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

// 定义UserController对象
const UserController = {
  //登录
  login: async (req, res) => {
    try {
      // 调用UserService的login方法，传入请求体
      const result = await UserService.login(req.body);

      // 如果结果为空，返回错误信息
      if (!result.length) {
        return res.send({ code: "-1", error: "用户名密码不匹配" });
      }

      // 生成JWT令牌，包含用户ID和用户名
      const token = JWT.generate(
        { _id: result[0]._id, username: result[0].username },
        "1d"
      );

      // 将令牌添加到响应头中
      res.header("Authorization", token);

      // 返回成功信息
      return res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0,
          introduction: result[0].introduction,
          avatar: result[0].avatar,
          role: result[0].role,
        },
      });
    } catch (error) {
      // 打印错误信息
      console.error(error);

      // 返回服务器错误
      return res.status(500).send({ error: "An error occurred during login." });
    }
  },
  //更新个人信息
  upload: async (req, res) => {
    //定义整理数据
    const { username, password, role, gender, introduction } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    // 从请求头中获取授权令牌
    // 注意：通常，授权令牌在 "Authorization" 头中，格式为 "Bearer <token>"
    const token = req.headers["authorization"].split(" ")[1];

    // 使用 JWT.verify() 函数验证令牌
    // 如果令牌有效，该函数会返回令牌的负载（payload）
    // 如果令牌无效，该函数会抛出一个错误
    var payload = JWT.verify(token);

    //调用Service模块更新数据
    await UserService.upload({
      _id: payload._id,
      username,
      password,
      role: Number(role),
      introduction,
      gender: Number(gender),
      avatar,
    });
    if (avatar) {
      res.send({
        ActionType: "OK",
        data: {
          username,
          password,
          role: Number(role),
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: "OK",
        data: {
          username,
          password,
          role: Number(role),
          introduction,
          gender: Number(gender),
        },
      });
    }
  },
  //添加用户
  add: async (req, res) => {
    const { username, password, role, gender, introduction } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    await UserService.add({
      username,
      password,
      role: Number(role),
      gender: Number(gender),
      introduction,
      avatar,
    });
    res.send({
      ActionType: "OK",
    });
  },
  //获取用户列表
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  //删除用户列表
  deleteList: async (req, res) => {
    const result = await UserService.deleteList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      //   data: result,
    });
  },
  //更新用户列表
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);

    res.send({
      ActionType: "OK",
    });
  },
};

// 导出UserController模块
module.exports = UserController;
