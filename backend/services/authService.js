const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authService = {
  signupUser: async (userData) => {
    const { name, email, password, phone } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      token
    };
  },

  loginUser: async (loginData) => {
    const { email, password } = loginData;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      token
    };
  }
};

module.exports = authService;