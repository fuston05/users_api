// auth router
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// express-validator
const { validationResult } = require("express-validator");
// express validator rules
const { registerValidation } = require("../../middleware");

const users = require("../users-model");

// register a new user
// return 'id' on success, error message if validation fails
router.post("/register", registerValidation, (req, res) => {
  // check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // if no validation errors proceed
  // hash user password
  const ROUNDS = parseInt(process.env.HASHING_ROUNDS);
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, ROUNDS);

  users
    .register(user)
    .then((userRes) => {
      userRes[0].message = `Welcome, ${userRes[0].userName}`;
      res.status(201).json(userRes[0]);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// login
router.post("/login", (req, res, next) => {
  users
    .login(req.body)
    .then((loginRes) => {
      if (loginRes !== null) {
        // database results info
        const hashedPass = loginRes.password;
        const userId = loginRes.id;
        const userName = loginRes.userName;
        const userPrivilege = loginRes.privilege_id;

        // user passed info
        const password = info.password;

        // check password hash and username
        if (
          bcrypt.compareSync(password, hashedPass) &&
          info.userName === userName
        ) {
          // json web token
          const payload = {
            sub: userId,
            privilege: userPrivilege,
          };
          const sec = process.env.JWT_SECRET;
          const options = {
            expiresIn: "8h",
          };
          const token = jwt.sign(payload, sec, options);

          // return the welcome <userName> message and token
          res.status(200).json({
            message: `Welcome ${userName}`,
            token: token,
          });
        } else {
          //  if username and pass do not match
          res.status(401).json({ Error: "Invalid credentials" });
        }
      } else {
        // if no results were found
        res.status(404).json({ Error: "User does not exist" });
      }
    })
    .catch(next);
});

module.exports = router;
