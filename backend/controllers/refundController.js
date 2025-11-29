const Refund = require("../models/Refund");

const refundController = {
  getMyRefunds: async (req, res) => {
    try {
      const refunds = await Refund.find({ userId: req.user.id })
        .sort({ requestedAt: -1 })
        .select("-__v");

      res.json({
        success: true,
        data: refunds
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
};

module.exports = refundController;
