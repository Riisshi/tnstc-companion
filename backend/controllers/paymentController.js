const Razorpay = require("razorpay");
const crypto = require("crypto");
const refundService = require("../services/refundService");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ============================================================
   CREATE RAZORPAY ORDER
============================================================ */
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount"
      });
    }

    const options = {
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: `tnstc_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create Razorpay order"
    });
  }
};

/* ============================================================
   GET REFUND STATUS BY PNR (ACCOUNT-LINKED)
   Route: GET /api/payments/refund/:pnr
============================================================ */
const getRefundStatus = async (req, res) => {
  try {
    const { pnr } = req.params;
    const userId = req.user.id; // from authMiddleware

    if (!pnr) {
      return res.status(400).json({
        success: false,
        error: "PNR is required"
      });
    }

    const status = await refundService.getRefundStatusByPNR(pnr, userId);

    res.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error("Refund Status Error:", error.message);

    const msg = error.message || "Failed to fetch refund status";

    // 404 for not found, 400 for logical errors
    if (msg.includes("not found") || msg.includes("not initiated")) {
      return res.status(404).json({ success: false, error: msg });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch refund status"
    });
  }
};

/* ============================================================
   VERIFY PAYMENT (CRITICAL SECURITY)
   Route: POST /api/payments/verify
============================================================ */
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment verification fields"
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified" });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid payment signature"
    });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed"
    });
  }
};

module.exports = {
  createOrder,
  getRefundStatus,
  verifyPayment,
};
