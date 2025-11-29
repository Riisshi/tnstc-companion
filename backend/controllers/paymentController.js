const paymentService = require("../services/paymentService");

const paymentController = {
  createOrder: async (req, res) => {
    try {
      const { amount } = req.body;
      
      const order = await paymentService.createRazorpayOrder(amount);
      
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  getRefundStatus: async (req, res) => {
    try {
      const { pnr } = req.params;
      
      const refundStatus = await paymentService.getRefundStatus(pnr);
      
      res.json({
        success: true,
        data: refundStatus
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = paymentController;