const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  // 10.13 中间件验证，401表示用户试图访问终端的验证未通过
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("用户未登录，无权限操作");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("用户未登录，无权限操作");
  }
};
