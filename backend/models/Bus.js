const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: String,
  type: String,
  fare: Number,
  seats: Number,
  departureTime: String,
  routeFrom: String,
  routeTo: String,
});

module.exports = mongoose.model("Bus", busSchema);
