const mongoose = require("mongoose");

const garbageSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  collectorName: {
    type: String,
    required: true,
  },
  garbageType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Garbage", garbageSchema);
