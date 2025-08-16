const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"] || req.headers["Authorization"];
    if (!header) return res.status(401).json({ success: false, message: "No token provided" });
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// helper to restrict role
exports.allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ success: false, message: "Forbidden" });
  next();
};
