const jsonwebtoken = require("jsonwebtoken");
const secret = "kerwin";
const JWT = {
  //生成token
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
    //value 加密内容
    //secret密钥
    //expiresIn过期时间
  },
  //验证token
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (e) {
      return false;
    }
  },
};

module.exports = JWT;
