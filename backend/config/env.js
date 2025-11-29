require("dotenv").config();

if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI");
if (!process.env.RAZORPAY_KEY_ID) throw new Error("Missing RAZORPAY_KEY_ID");
if (!process.env.RAZORPAY_KEY_SECRET) throw new Error("Missing RAZORPAY_KEY_SECRET");

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
  razorpayKey: process.env.RAZORPAY_KEY_ID,
  razorpaySecret: process.env.RAZORPAY_KEY_SECRET,
  port: process.env.PORT || 4000
};
