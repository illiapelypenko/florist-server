const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/makeorder", (req, res) => {
  const { name, address, phone, email, basket } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "illiapelypenko@gmail.com",
      pass: "umgqjpaejznlmifl",
    },
  });

  const mailOptions = {
    to: email,
    subject: "Заказ принят",
    html: "<h1>Заказ принят</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status("400").send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
