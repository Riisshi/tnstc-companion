const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  busName: {
    type: String,
    required: [true, "Bus name is required"],
    trim: true
  },
  from: {
    type: String,
    required: [true, "Departure location is required"],
    trim: true
  },
  to: {
    type: String,
    required: [true, "Destination is required"],
    trim: true
  },
  date: {
    type: String,
    required: [true, "Travel date is required"]
  },
  seat: {
    type: Number,
    required: [true, "Seat number is required"],
    min: [1, "Seat number must be at least 1"]
  },
  paymentId: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"]
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed"
  },
  pnr: {
    type: String,
    unique: true,
    default: function() {
      return "PNR" + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ pnr: 1 });

// Virtual for formatted date (optional)
bookingSchema.virtual('formattedDate').get(function() {
  return new Date(this.date).toLocaleDateString('en-IN');
});

module.exports = mongoose.model("Booking", bookingSchema);