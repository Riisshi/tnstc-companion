const express = require("express");
const router = express.Router();
const refundController = require("../controllers/refundController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/pnr/:pnr", authMiddleware.verifyToken, refundController.getRefundStatus);

router.get("/", authMiddleware.verifyToken, refundController.getMyRefunds);

module.exports = router;

