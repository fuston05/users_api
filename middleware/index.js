// middleware index
const {
  registerValidation,
  loginValidation,
  isLoggedIn,
} = require("./validation");
const { assignId } = require("./validation");
const passwordHash = require("./passwordHash");
const isVerified = require("./isVerified");

module.exports = {
  isLoggedIn,
  registerValidation,
  loginValidation,
  assignId,
  passwordHash,
  isVerified,
};
