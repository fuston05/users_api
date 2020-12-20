const jwt = require("jsonwebtoken");

// make sure user credentials and role are good.

const restrict = (req, res, next) => {
  const token = req.headers.authorization;
  const sec = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, sec);
  if (decoded.role !== 2) {
    res.status(401).json({Error: "Not authorized"})
  } else {
    next();
  }
};

module.exports = {
  restrict,
};
