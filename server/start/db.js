const mongoose = require("mongoose");

module.exports = function () {
  mongoose
  .connect("mongodb://localhost/jackyapp")
  .then(console.log("connected to db..."));
};
