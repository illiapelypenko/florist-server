const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
const { mongodb } = require("./config");
const items = require("./routes/items");
const types = require("./routes/types");
const contacts = require("./routes/contacts");
const order = require("./routes/order");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/items", items);
app.use("/api/types", types);
app.use("/api/contacts", contacts);
app.use("/api/order", order);

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
