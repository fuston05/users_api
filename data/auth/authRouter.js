// auth router
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const users = require("../users-model");

// register a new user
// return 'id' on success, error message if user already exists
router.post("/register", (req, res, next) => {
  const rounds = parseInt(process.env.HASHING_ROUNDS);
  const user = req.body;
  // hash user password
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  users
    .register(user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

// login
router.post("/login", (req, res, next) => {
  const info = {
    userName: req.body.userName,
    password: req.body.password,
  };
  users
    .login(info)
    .then((loginRes) => {
      if (loginRes !== null) {
        // database results info
        const hashedPass = loginRes.password;
        const userId = loginRes.id;
        const userName = loginRes.userName;

        // user passed info
        const password = info.password;

        // check password hash and username
        if (
          bcrypt.compareSync(password, hashedPass) &&
          info.userName === userName
        ) {
          // return the userId, and userName
          res.status(200).json({ id: userId, userName: userName });
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
