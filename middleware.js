const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const sec = process.env.JWT_SECRET;
  jwt.verify(authHeader, sec, (err, decoded) => {
    if (err) {
      res.status(401).json({ Error: "Not authorized" });
    } else {
      res.locals.privilege = decoded.privilege;
      next();
    }
  });
};

module.exports = {
  isLoggedIn,
};
