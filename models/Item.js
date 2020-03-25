const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    require: true
  },
  birthtimeMs: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("item", ItemSchema);
