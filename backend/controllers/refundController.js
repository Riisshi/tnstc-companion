const refundService = require("../services/refundService");

const refundController = {
  getRefundStatus: async (req, res) => {
    try {
      const { pnr } = req.params;
      const userId = req.user.id;

      const data = await refundService.getRefundStatusByPNR(pnr, userId);

      res.json({ success: true, data });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  getMyRefunds: async (req, res) => {
    try {
      const userId = req.user.id;
      const refunds = await refundService.getUserRefunds(userId);

      res.json({ success: true, data: refunds });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = refundController;

