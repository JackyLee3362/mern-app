const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require("joi");

const websites = require("./routes/websites");

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`listening the port ${port}`)
);

app.use(cors());

mongoose
  .connect("mongodb://localhost/jackyapp")
  .then(console.log("connected to db..."));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello, jackyapp");
});
app.use("/api/websites", websites);

exports = server;
