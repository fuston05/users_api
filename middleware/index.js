// middleware index
const { isLoggedIn } = require('./middleware');
const { registerValidation } = require('./validation');

module.exports = {
  isLoggedIn,
  registerValidation,
}