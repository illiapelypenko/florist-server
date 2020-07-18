const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

function makeUserEmail(name, address, phone, email, basket) {
  function makeOrder() {
    let order = "";
    basket.forEach((item) => {
      order += item.name + " " + item.price + "<br>";
    });
    return order;
  }

  return `
    <h1>Заказа принят</h1>
    <h3>Данные заказа</h3>
    Имя: ${name}<br>
    Адресс: ${address}<br>
    Телефон: ${phone}<br>
    Емейл: ${email}<br>
    <h3>Заказ:</h3>
    ${makeOrder()}
  `;
}

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
    html: makeUserEmail(name, address, phone, email, basket),
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

  transporter.sendMail(
    {
      to: "illiapelypenko@gmail.com",
      subject: "Заказ принят",
      html: makeUserEmail(name, address, phone, email, basket),
    },
    function (error, info) {
      if (error) {
        console.log(error);
        res.status("400").send("error");
      } else {
        console.log("Email sent: " + info.response);
        res.send("success");
      }
    }
  );
});

module.exports = router;
