import axios from "axios";

const upload = async (path, userForm) => {
  // 创建一个新的 FormData 实例
  const params = new FormData();

  // 遍历 userForm 对象，将每个属性添加到 FormData 实例中
  for (let key in userForm) {
    if (userForm.hasOwnProperty(key)) {
      params.append(key, userForm[key]);
    }
  }

  try {
    // 使用 axios 发送 POST 请求，上传 FormData
    // 设置请求头部为 multipart/form-data，这是文件上传所需要的
    const response = await axios
      .post(path, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });

    // 返回服务器的响应
    return response;
  } catch (error) {
    // 如果请求失败，抛出错误
    throw error;
  }
};

export default upload;
