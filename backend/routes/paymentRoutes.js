const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-order", authMiddleware.verifyToken, paymentController.createOrder);
router.get("/refund/:pnr", authMiddleware.verifyToken, paymentController.getRefundStatus);

module.exports = router;