const express = require("express");
const Type = require("../models/Type");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;

    let newType = new Type({
      name
    });

    await newType.save();

    res.status(200).send();
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.get("/all", async (req, res) => {
  try {
    let types = await Type.find();
    types = types
      .map(type => {
        return ({ _id, name } = type);
      })
      .reverse();
    res.json(types);
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    Type.deleteOne({ _id: req.params.id }, err => console.log);
    res.send();
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

module.exports = router;
