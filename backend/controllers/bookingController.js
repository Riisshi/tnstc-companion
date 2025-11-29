const bookingService = require("../services/bookingService");

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const bookingData = {
        ...req.body,
        userId: req.user.id
      };
      
      const booking = await bookingService.createBooking(bookingData);
      
      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookings = await bookingService.getUserBookings(userId);
      
      res.json({
        success: true,
        data: bookings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const booking = await bookingService.getBookingById(id, userId);
      
      res.json({
        success: true,
        data: booking
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await bookingService.getAllBookings();
      
      res.json({
        success: true,
        data: bookings
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = bookingController;