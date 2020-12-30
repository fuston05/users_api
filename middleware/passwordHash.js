// middleware to hash the user password
const bcrypt = require('bcryptjs');

const passwordHash = (req, res, next) => {
  const ROUNDS = parseInt(process.env.HASHING_ROUNDS);
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, ROUNDS);
  next();
};

module.exports = passwordHash;
