// express-validator, validation array for authRouter

const { body } = require("express-validator");
// model_utils
const { userCredsExist } = require("../utils");

const registerValidation = [
  // 0-1: username
    body("userName", "Invalid user name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlphanumeric()
    .escape()
      .bail(),
  
  // custom check to see if user name already in DB
  // 0-1: userName
    body("userName", "User name already in use").custom(async (value) => {
    const userNameExists = await userCredsExist({ userName: value })
    if (userNameExists) {
      return Promise.reject();
    }
  }),

    // 2: password
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
    })
    .escape(),

  body("email", "Invalid email")
    .trim()
    .notEmpty()
    .toLowerCase()
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail()
    .escape(),
  
  // custom check to see if user email already in DB
    body("email", "Email already in use")
    .custom(async value => {
    const emailExists = await userCredsExist({ email: value })
    if (emailExists) {
      return Promise.reject()
    }
  }),

    body("current_salary", "Invalid salary")
    .trim()
    .notEmpty()
    .bail()
    .isNumeric({ no_symbols: true, locale: "en-US" })
    .escape(),

    body("hire_date", "Invalid hire date")
    .trim()
    .notEmpty()
    .bail()
    .isDate()
    .escape(),

    body("department_id", "Invalid department id")
    .trim()
    .notEmpty()
    .bail()
    .isNumeric({ no_symbols: true, locale: "en-US" })
    .escape(),

    body("privilege_id", "Invalid privilege id")
    .trim()
    .notEmpty()
    .bail()
    .isNumeric({ no_symbols: true, locale: "en-US" })
    .escape(),
];


module.exports = {
  registerValidation,
};
