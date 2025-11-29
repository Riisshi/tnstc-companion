const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
      const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;
      const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET || "SECRET123");
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  },

  requireAdmin: (req, res, next) => {
    // For future admin role implementation
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  }
};

module.exports = authMiddleware;