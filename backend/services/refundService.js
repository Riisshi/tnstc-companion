const Booking = require("../models/Booking");
const Refund = require("../models/Refund");

const refundService = {
  createRefundForBooking: async (booking, options = {}) => {
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

  getRefundStatusByPNR: async (pnr, userId) => {
    const booking = await Booking.findOne({ pnr, userId });
    if (!booking) throw new Error("Booking not found for this PNR");

    const refund = await Refund.findOne({ bookingId: booking._id });
    if (!refund) throw new Error("Refund not initiated for this booking");

    return {
      pnr: refund.pnr,
      status: refund.status,
      amount: refund.amount,
      processedAt: refund.processedAt || null
    };
  },

  getUserRefunds: async (userId) => {
    return await Refund.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");
  }
};

module.exports = refundService;

