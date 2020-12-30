// express-validator, validation array for authRouter
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
// model_utils
const { userCredsExist } = require("../data/db_utils");

const minNameLength = 3;
const maxNameLength = 20;

const registerValidation = [
  // first name
  body("firstName", "Invalid first name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlpha()
    .bail()
    .escape(),

  // first name length
  body("firstName", `First name must be ${minNameLength} - ${maxNameLength} characters`).custom((value) => {
    if (value.length < maxNameLength && value.length > minNameLength) {
      return true;
    }
  }),

  // last name
  body("lastName", "Invalid last name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlpha()
    .bail()
    .escape(),
  
  // last name length
  body("lastName", `Last name must be ${minNameLength} - ${maxNameLength} characters`).custom((value) => {
    if (value.length < maxNameLength && value.length > minNameLength) {
      return true;
    }
  }),

  // username
  body("userName", "Invalid user name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlphanumeric()
    .escape(),
  
  // username length
  body("userName", `User name must be ${minNameLength} - ${maxNameLength} characters`)
    .custom((value) => {
      if (value.length < maxNameLength && value.length > minNameLength) {
        return true
      }
    }),

  // custom check to see if user name already in DB
  // userName
  body("userName", "User name already in use").custom(async (value) => {
    const userNameExists = await userCredsExist({ userName: value });
    if (userNameExists) {
      return Promise.reject();
    }
  }),

  // password
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
    .bail()
    .isEmail()
    .bail()
    .normalizeEmail()
    .escape(),

  // custom check to see if user email already in DB
  body("email", "Email already in use").custom(async (value) => {
    const emailExists = await userCredsExist({ email: value });
    if (emailExists) {
      return Promise.reject();
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

const loginValidation = [
  // username valid
  body("userName", "Invalid user name")
    .trim()
    .toLowerCase()
    .notEmpty()
    .bail()
    .isAlphanumeric()
    .escape(),

  // custom check to see if user name already in DB
  // userName already in use?
  body("userName", "User name already in use").custom(async (value) => {
    const userNameExists = await userCredsExist({ userName: value });
    if (userNameExists) {
      return Promise.reject();
    }
  }),

  // password
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
];

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const sec = process.env.JWT_SECRET;
  jwt.verify(authHeader, sec, (err, decoded) => {
    if (err) {
      res.status(401).json({ Error: "Not authorized" });
    } else {
      res.locals.privilege = decoded.privilege;
      next();
    }
  });
};

module.exports = {
  registerValidation,
  loginValidation,
  isLoggedIn,
};
