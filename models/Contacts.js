const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema({
  phone1: {
    type: String,
    required: true
  },
  phone2: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("contacts", TypeSchema);
