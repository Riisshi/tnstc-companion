const authService = require("../services/authService");

const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      
      const result = await authService.signupUser({
        name, 
        email, 
        password, 
        phone
      });
      
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const result = await authService.loginUser({
        email, 
        password
      });
      
      res.json({
        success: true,
        message: "Login successful",
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = authController;