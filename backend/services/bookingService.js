const Booking = require("../models/Booking");
const refundService = require("./refundService");

const bookingService = {
  createBooking: async (bookingData) => {
    const { userId, busName, from, to, date, seat, paymentId, amount } =
      bookingData;

    if (!userId || !busName || !from || !to || !date || !seat || !amount) {
      throw new Error("Missing required booking fields");
    }

    const booking = new Booking({
      userId,
      busName,
      from,
      to,
      date,
      seat,
      paymentId,
      amount,
    });

    await booking.save();
    return booking;
  },

  getUserBookings: async (userId) => {
    return await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");
  },

  getBookingById: async (bookingId, userId) => {
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
    });

    if (!booking) throw new Error("Booking not found");
    return booking;
  },

  getAllBookings: async () => {
    return await Booking.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .select("-__v");
  },

  cancelBooking: async (bookingId, userId) => {
    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) throw new Error("Booking not found or unauthorized");

    if (booking.status === "cancelled") {
      throw new Error("Booking is already cancelled");
    }

    const travelDate = new Date(booking.date);
    const today = new Date();
    if (travelDate < today) throw new Error("Cannot cancel past bookings");

    // Cancel booking
    booking.status = "cancelled";
    booking.refundInitiated = true;
    await booking.save();

    // Create refund entry
    const refund = await refundService.createRefundForBooking(booking, {
      status: "pending",
      reason: "User cancelled booking"
    });

    return { booking, refund };
  }
};

module.exports = bookingService;

