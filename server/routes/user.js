const _ = require("lodash");
const bcrypt = require("bcrypt"); // 用来加密的库
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const config = require("../start/config");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.find();
  res.send(user);
});

// GET /me
router.get("/me", auth, async (req, res) => {
  // 如果在config设置requiresAuth为false，则直接访问这个地址会错误
  // 原因用户并没用通过jwt解码获得_id

  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST /
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 保证没有重复注册
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("email has already registered");

  // 创建模型并加密
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // 保存用户
  await user.save();

  // 生成jwt令牌并设置头部，返回
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") // react 9.9内容，目的是让浏览器可以访问包的头部
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
