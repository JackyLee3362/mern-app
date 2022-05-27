const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");

// 创建范式
const websiteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
});

// 创建模型
const Website = mongoose.model("Websites", websiteSchema);

// 验证逻辑函数
function validateWebsite(website) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    url: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(website);
}

// exports.userSchema = userSchema;
exports.Website = Website;
exports.validate = validateWebsite;
