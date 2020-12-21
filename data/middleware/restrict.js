const jwt = require("jsonwebtoken");

// make sure user credentials and role are good.
// role_Id's : 1= User, 2= Admin

const restrict = (role_Id) => {
  const restFunc = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      const sec = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, sec);
      if (decoded.role < role_Id) {
        // if user_role is NOT at LEAST the specified 'role_Id'
        res.status(401).json({ Error: "Not authorized" });
      } else {
        next();
      }
    } else {
      res.status(401).json({ Error: "Not authorized" });
    }
  };
  return restFunc;
};

module.exports = {
  restrict,
};
