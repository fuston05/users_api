const jwt = require("jsonwebtoken");

// make sure user credentials and role are good.
// role_Id's : 1= User, 2= Admin

const restrict = (role_Id) => {
  const restFunc = (req, res, next) => {
    const token = req.headers.authorization;
    const sec = process.env.JWT_SECRET;

    jwt.verify(token, sec, (err, decoded) => {
      if (err) {
        res.status(401).json({ Error: "Not authorized" });
      } else {
        // if user_role is NOT at LEAST the specified 'role_Id'
        if (decoded.role < role_Id) {
          res.status(401).json({ Error: "Not authorized" });
        } else {
          next();
        }
      }
    });
  };
  return restFunc;
};

module.exports = {
  restrict,
};
