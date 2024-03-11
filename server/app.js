// 引入所需的模块
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("./util/JWT");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/UserRouter");
const NewsRouter = require("./routes/admin/NewsRouter");
const webNewsRouter = require("./routes/web/NewsRouter");
const ProductRouter = require("./routes/admin/ProductRouter");
const webProductRouter = require("./routes/web/ProductRouter");
const { log } = require("console");

// 创建Express应用
const app = express();

// 使用中间件来解析请求体
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//
app.use(webNewsRouter);
app.use(webProductRouter);
// 使用中间件来处理JWT令牌
app.use((req, res, next) => {
  // 如果请求来自/adminapi，则进行JWT验证
  if (req.url.startsWith("/adminapi")) {
    // 从请求头中取出令牌
    const token = req.headers["authorization"]?.split(" ")[1];

    // 如果没有令牌，并且请求的不是登录页面，返回401状态码
    if (!token && req.url !== "/adminapi/user/login") {
      res.status(401).send({ errCode: "-1", errorInfo: "没有提供aa令牌" });
      return;
    }

    // 如果请求的是登录页面，直接放行
    if (req.url === "/adminapi/user/login") {
      next();
      return;
    }

    // 验证令牌
    let payload = JWT.verify(token);

    // 如果令牌过期，返回401状态码
    if (!payload) {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
      return;
    }

    // 生成新的令牌
    const newToken = JWT.generate(
      {
        _id: payload._id,
        username: payload.username,
      },
      "1d"
    );

    // 将新的令牌添加到响应头中
    res.header("Authorization", newToken);

    // 继续处理请求
    next();
  } else {
    // 如果请求不来自/adminapi，则直接放行
    next();
  }
});

// 使用路由
app.use(UserRouter);
app.use(NewsRouter);

app.use(ProductRouter);
// 设置视图引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 使用日志和静态文件中间件
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

// 使用路由
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 处理404错误
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理器
app.use((err, req, res, next) => {
  // 设置本地变量，只在开发环境中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render("error");
});

// 导出app模块
module.exports = app;
