const express = require("express");

const websites = require("../routes/websites");
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error"); // 11.3
module.exports = function (app) {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("hello, jackyapp");
  });
  app.use("/api/websites", websites);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error); // 11.3 处理异常的中间件（一定要放在路由配置后面）
};
