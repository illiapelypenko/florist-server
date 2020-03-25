const express = require("express");
const Contacts = require("../models/Contacts");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.json(contacts[0]);
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const contacts = ({ phone1, phone2, email } = req.body);
    let doc;
    if ((await Contacts.find()).length > 0) {
      doc = await Contacts.findOneAndUpdate(() => true, { ...contacts });
    } else {
      let newContacts = new Contacts(contacts);
      doc = await newContacts.save();
    }
    res.json(doc);
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

module.exports = router;
