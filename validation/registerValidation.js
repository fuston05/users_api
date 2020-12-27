// express-validator, validation array for authRouter

const { body } = require("express-validator");

const registerValidation= [
  body("userName", "Invalid user name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlphanumeric()
    .escape(),

  body("password", "Invalid password")
    .trim()
    .notEmpty()
    .bail()
    .escape()
    .isStrongPassword({
      minLength: 4,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 4,
      minSymbols: 0,
    }).escape(),

  body("email", "Invalid email")
    .trim()
    .notEmpty()
    .toLowerCase()
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail()
    .escape(),

  body("current_salary", "Invalid salary")
    .trim()
    .notEmpty()
    .bail()
    .isNumeric({ no_symbols: true, locale: "en-US" }).escape(),
  
  body('hire_date', "Invalid hire date").trim().notEmpty().bail().isDate().escape(),

  body('department_id', 'Invalid department id').trim().notEmpty().bail().isNumeric({ no_symbols: true, locale: 'en-US' }).escape(),
  
  body('privilege_id', 'Invalid privilege id').trim().notEmpty().bail().isNumeric({no_symbols: true, locale: 'en-US'}).escape()
]

module.exports = {
  registerValidation
}