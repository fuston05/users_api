// check if user has verified their email

const db = require('../data/db-config');

const isVerified = async (req, res, next) => {
  // check database to see if account is verified or not
  next();
}


module.exports = isVerified;