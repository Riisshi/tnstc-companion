const Booking = require("../models/Booking");
const Refund = require("../models/Refund");

const refundService = {
  // Called when a booking is cancelled (or when you explicitly trigger refund)
  createRefundForBooking: async (booking, options = {}) => {
    // Avoid duplicate refund records
    let existing = await Refund.findOne({ bookingId: booking._id });
    if (existing) return existing;

    const refund = new Refund({
      bookingId: booking._id,
      userId: booking.userId,
      pnr: booking.pnr,
      amount: booking.amount,
      status: options.status || "pending",
      reason: options.reason || null
    });

    await refund.save();
    return refund;
  },

  // What your RefundTracker.jsx really wants
  getRefundStatusByPNR: async (pnr, userId) => {
    // Ensure booking exists and belongs to this user
    const booking = await Booking.findOne({ pnr, userId });
    if (!booking) {
      throw new Error("Booking not found for this PNR");
    }

    const refund = await Refund.findOne({ bookingId: booking._id });

    if (!refund) {
      // Booking exists but refund not initiated
      throw new Error("Refund not initiated for this booking");
    }

    return {
      pnr: refund.pnr,
      status: refund.status,
      amount: refund.amount,
      processedAt: refund.processedAt || null
    };
  },

  getUserRefunds: async (userId) => {
    const refunds = await Refund.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");
    return refunds;
  }
};

module.exports = refundService;
