const jwt = require("jsonwebtoken");

// make sure user credentials and role are good.

const restrict = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token: ", token);
  const sec = process.env.JWT_SECRET;
  jwt.verify(token, sec, function(err, decoded) {
    console.log("decoded: ", decoded);
  });
  next();
};

module.exports = {
  restrict,
};
