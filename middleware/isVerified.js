// check if user has verified their email
const { users } = require("../models");

const isVerified = async (req, res, next) => {
  // check database to see if account is verified or not
  let user = null;

  if (req.query.u) {
    user = await users
      .findByUserName(req.query.u)
      .then((resp) => {
        if (!resp.isVerified) {
          // add 'isVerified' to req.body
          req.body.isVerified = false;
          next();
        } else {
          req.body.isVerified = true;
          next();
        }
      })
      .catch((err) => {
        return res.status(400).json({ Error: "User does not exist" });
      });
  }
};

module.exports = isVerified;
