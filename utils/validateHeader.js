const jwt = require("jsonwebtoken");

const validateHeader = (allowedRoles) => {
  return (req, res, done) => {
    try {
      const token = req.headers.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (allowedRoles.includes(decoded.role)) {
        req.sessionObject = decoded;
        done();
      } else {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
    } catch (error) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};

module.exports = {
  validateHeader,
};
