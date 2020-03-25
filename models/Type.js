const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("type", TypeSchema);
