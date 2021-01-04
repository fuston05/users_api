// check if user has verified their email
const {users} = require("../models");

const isVerified = async (req, res, next) => {
  // check database to see if account is verified or not
  let user = null;
  if (req.query.u) {
    user = await users.findByEmail(req.query.u);
  } else if (req.body.userName) {
    user = await users.findByUserName(req.body.userName);
  }
  if (!user.isVerified) {
    req.body.isVerified = false;
    next();
  } else {
    req.body.isVerified = true;
    next();
  }
};

module.exports = isVerified;
