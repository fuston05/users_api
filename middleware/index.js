// middleware index
const {
  registerValidation,
  loginValidation,
  isLoggedIn,
} = require("./validation");
const { assignId, accessLogStream } = require("./morgan");
const passwordHash = require("./passwordHash");

module.exports = {
  isLoggedIn,
  registerValidation,
  loginValidation,
  assignId,
  passwordHash,
  accessLogStream,
};
