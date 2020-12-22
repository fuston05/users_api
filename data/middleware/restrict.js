const jwt = require("jsonwebtoken");

// make sure user credentials and privileges are good.
// privilege_id's : 1= User, 2= Admin

const restrict = (privilege_id) => {
  const restFunc = (req, res, next) => {
    const token = req.headers.authorization;
    const sec = process.env.JWT_SECRET;

    jwt.verify(token, sec, (err, decoded) => {
      if (err) {
        res.status(401).json({ Error: "Not authorized" });
      } else {
        // if user_privilege is NOT at LEAST the specified 'privilege_id'
        if (decoded.privilege < privilege_id) {
          res.status(401).json({ Error: "Not authorized" });
        } else {
          res.locals.privilege_id= decoded.privilege;
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
