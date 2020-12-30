// middleware index
const {
  registerValidation,
  loginValidation,
  isLoggedIn,
} = require("./validation");
const { assignId } = require("./validation");

module.exports = {
  isLoggedIn,
  registerValidation,
  loginValidation,
  assignId,
};
