const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Mock refund database (replace with actual database in production)
const refundDatabase = {
  "PNR1001": { pnr: "PNR1001", status: "Processed", amount: 200, processedAt: new Date('2024-01-15') },
  "PNR1002": { pnr: "PNR1002", status: "Pending", amount: 150, requestedAt: new Date('2024-01-16') },
  "PNR1003": { pnr: "PNR1003", status: "Rejected", amount: 0, reason: "Cancellation time expired" }
};

const paymentService = {
  createRazorpayOrder: async (amount) => {
    try {
      const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      throw new Error(`Payment order creation failed: ${error.message}`);
    }
  },

  getRefundStatus: async (pnr) => {
    const refundStatus = refundDatabase[pnr];
    
    if (!refundStatus) {
      throw new Error("Refund not found for this PNR");
    }

    return refundStatus;
  },

  // Additional method for future use - verifying payment
  verifyPayment: async (paymentId, orderId, signature) => {
    const crypto = require('crypto');
    
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest('hex');

    return generatedSignature === signature;
  }
};

module.exports = paymentService;