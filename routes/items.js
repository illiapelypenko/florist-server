const express = require("express");
const Item = require("../models/Item");
const fs = require("fs");
const router = express.Router();
const absolutePath = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
// const imagesStore = `${__dirname}/../items-images`;

router.get("/all", async (req, res) => {
  try {
    let items = await Item.find();
    items = items
      .map((item) => {
        return ({
          _id,
          name,
          price,
          data,
          fileName,
          type,
          birthtimeMs,
          checked,
        } = item);
      })
      .reverse();
    res.json(items);
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.get("/picture/:id", async (req, res) => {
  try {
    const file = await Item.findOne({ _id: req.params.id });
    res.status(200).end(file.data, "binary");
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    Item.deleteOne({ _id: req.params.id }, (err) => console.log);
    res.send();
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.post("/upload", async (req, res) => {
  try {
    const file = req.files.file;
    const fileName = file.name;
    const data = file.data;

    const name = req.body.name;
    const price = req.body.price;
    const type = req.body.type;
    const birthtimeMs = new Date().getTime();

    const params = {
      Bucket: "florist-images",
      Key: fileName, // File name you want to save as in S3
      Body: data, // Buffer
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(400).send("server error");
        throw err;
      }
      let newItem = new Item({
        name,
        price,
        location: data.Location,
        fileName,
        type,
        birthtimeMs,
      });

      await newItem.save();
      res.status(200).send();
    });
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

router.post("/upload-test", async (req, res) => {
  try {
    const file = req.files.file;
    const fileName = file.name;
    const data = file.data;

    const params = {
      Bucket: "florist-images",
      Key: fileName, // File name you want to save as in S3
      Body: data, // Buffer
    };

    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }

      res.status(200).send(data.Location);
    });
  } catch (e) {
    res.status(400).send("server error");
    console.log(e);
  }
});

// router.post('/test', async (req, res) => {
//   try {
// 		const file = req.files.file;
// 		const data = file.data;
// 		const params = {
//       Bucket: 'florist-images',
//       Key: 'test-img',
//       Body: data,
// 		};
// 		s3.upload(params, async function (err, data) {
//       if (err) {
//         throw err;
//       }
//       res.status(200).send(data);
//     });
// 		res.status(200).end(data, 'binary');
//   } catch (e) {
//     res.status(400).send('server error');
//     console.log(e);
//   }
// });

module.exports = router;
