// models/Schedule.js
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  
  date: { type: String, required: true }, // “2025-12-05”
  departureTime: { type: String, required: true }, // “06:30”
  arrivalTime: { type: String, required: true },

  fare: { type: Number, required: true },
  availableSeats: { type: Number, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);
