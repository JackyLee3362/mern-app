const _ = require("lodash");
const bcrypt = require("bcrypt"); // 用来加密的库
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  // 验证数据
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 验证用户是否在数据库中
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email");

  // 验证密码（bcrypt）
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");
  await user.save();

  // 10.9 生成jwt令牌
  const token = user.generateAuthToken();

  // 创建完用户后直接设置令牌
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") // react 9.9内容，目的是让浏览器可以访问包的头部
    .send(_.pick(user, ["_id", "name", "email"]));
});

// 因为这里不需要name，所以不适用model/user中的验证方法
function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

module.exports = router;
