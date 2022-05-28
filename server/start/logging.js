const winston = require("winston"); // 11.6 记录错误日志
require("express-async-errors"); // 11.4 express的模块（可以不用11.3了），建议使用这个，如果无效，可以使用上面这个函数

module.exports = function () {
  // 11.9 简化版，Mosh推荐这个
  winston.exceptions.handle(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    }), // 11.16
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  // 11.9 处理被拒的Promise
  process.on("unhandledRejection", (ex) => {
    console.log("WE GOT AN UNHANDLED REJECTION");
    winston.error(ex.message, ex);
  });

  // 11.6 记录错误日志
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
