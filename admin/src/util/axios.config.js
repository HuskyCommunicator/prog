import axios from "axios";

// 请求发出前的拦截
axios.interceptors.request.use(
  (config) => {
    // 从本地存储中获取令牌
    const token = localStorage.getItem("token");

    // 如果令牌存在，将其添加到请求头中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 返回配置对象
    return config;
  },
  // 如果发生错误，返回一个带有错误信息的Promise
  (error) => Promise.reject(error)
);

// 请求响应前的拦截
axios.interceptors.response.use(
  (response) => {
    // 从响应头中获取授权令牌
    const { authorization } = response.headers;

    // 如果授权令牌存在，将其存储到本地存储中
    if (authorization) {
      localStorage.setItem("token", authorization);
    }

    // 返回响应对象
    return response;
  },
  (error) => {
    // 如果响应状态码为401，重定向到登录页面
    if (error.response.status === 401) {
      window.location.href = "#/login";
    }

    // 返回一个带有错误信息的Promise
    return Promise.reject(error);
  }
);
