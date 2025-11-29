const Booking = require("../models/Booking");

const bookingService = {
  createBooking: async (bookingData) => {
    const {
      userId,
      busName,
      from,
      to,
      date,
      seat,
      paymentId,
      amount
    } = bookingData;

    // Validate required fields
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
      amount
    });

    await booking.save();
    return booking;
  },

  getUserBookings: async (userId) => {
    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    return bookings;
  },

  getBookingById: async (bookingId, userId) => {
    const booking = await Booking.findOne({
      _id: bookingId,
      userId
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  },

  getAllBookings: async () => {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .select('-__v');
    
    return bookings;
  }
};

module.exports = bookingService;