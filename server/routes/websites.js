const express = require("express");
const Joi = require("joi");
const { Website, validate } = require("../models/websites");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// GET /
router.get("/", async (req, res, next) => {
  const websites = await Website.find();
  res.send(websites);
});

// GET /:id
router.get("/:id", [auth], async (req, res) => {
  const website = await Website.findById(req.params.id);
  if (!website)
    return res.status(404).send("The Website with the given Id is not found");
  res.send(website);
});

// POST /
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 保证没有重复的url
  let website = await Website.findOne({ url: req.body.url });
  if (website) return res.status(400).send("url already existed");

  // 可以添加新的url
  website = new Website(_.pick(req.body, ["name", "url"]));
  website = await website.save();
  res.send(website);
});

// PUT /:id
router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const website = await Website.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, url: req.body.url, like: req.body.like },
    { new: true }
  );
  if (!website) return res.status(404).send("not found");

  res.send(website);
});

// DELETE /:id
router.delete("/:id", [auth, admin], async (req, res) => {
  const websites = await Website.findByIdAndRemove(req.params.id);
  if (!websites)
    return res.status(404).send("The Website with the given id is not found");

  res.send(websites);
});

module.exports = router;
