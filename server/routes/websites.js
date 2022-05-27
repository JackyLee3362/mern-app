const express = require("express");
const Joi = require("joi");
const { Website, validate } = require("../models/websites");

const router = express.Router();

// GET /
router.get("/", async (req, res, next) => {
  console.log("done");
  const websites = await Website.find();
  res.send(websites);
});

// GET /:id
router.get("/:id", async (req, res) => {
  const website = await Website.findById(req.params.id);
  if (!website)
    return res.status(404).send("The Website with the given Id is not found");
  res.send(website);
});

// POST /
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let website = new Website({
    name: req.body.name,
    url: req.body.url,
  });
  website = await website.save();
  res.send(website);
});

// PUT /:id
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const website = await Website.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, url: req.body.url },
    { new: true }
  );
  if (!website) return res.status(404).send("not found");

  res.send(website);
});

// DELETE /:id
router.delete("/:id", async (req, res) => {
  const websites = await Website.findByIdAndRemove(req.params.id);
  if (!websites)
    return res.status(404).send("The Website with the given id is not found");

  res.send(websites);
});

module.exports = router;
