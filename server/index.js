const express = require("express");

const app = express();

require("./start/logging")(); // 11.13 优化日志逻辑
require("./start/cors")(app); // react课程中的8.23内容
require("./start/route")(app); // 11.11 优化路由逻辑
require("./start/db")(); // 11.12 优化数据库逻辑
require("./start/config")(); // 11.14 优化配置逻辑
// require("./start/validation")(); // 11.15 优化验证逻辑
// require("./start/debug")(app); // 自己加的：优化调试逻辑
// require("./start/safe")(app); // 自己加的：优化安全逻辑
// require("./start/static")(app); // 自己加的：优化静态资源逻辑

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`listening the port ${port}`)
);
exports = server;
