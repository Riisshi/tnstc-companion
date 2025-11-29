const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pnr: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ["pending", "processed", "failed"],
    default: "pending"
  },
  processedAt: {
    type: Date
  }
}, { timestamps: true });

refundSchema.index({ bookingId: 1 });

module.exports = mongoose.model("Refund", refundSchema);
 
