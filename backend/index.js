const express = require("express");
const cors = require("cors"); // Add this line
const app = express();

require("dotenv").config();

app.use(cors()); // Add this line
app.use(express.json());

const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
