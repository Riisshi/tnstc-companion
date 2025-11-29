const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

// All booking routes require authentication
router.post("/", authMiddleware.verifyToken, bookingController.createBooking);
router.get("/my-bookings", authMiddleware.verifyToken, bookingController.getUserBookings);
router.get("/:id", authMiddleware.verifyToken, bookingController.getBookingById);

// Admin routes (optional - for future use)
router.get("/", authMiddleware.verifyToken, authMiddleware.requireAdmin, bookingController.getAllBookings);

module.exports = router;