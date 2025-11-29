const express = require("express");
const router = express.Router();
const refundController = require("../controllers/refundController");
const auth = require("../middleware/authMiddleware");

// GET all refunds of logged-in user
router.get("/my-refunds", auth.verifyToken, refundController.getMyRefunds);

module.exports = router;
