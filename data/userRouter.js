// user router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const users = require("./users-model");

// get all users
router.get("/", (req, res) => {
  users
    .find()
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      } else {
        res.status(200).json("[] No users found");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "server error" });
    });
});

// get user by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  users
    .findById(id)
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      } else {
        // if user not found
        res.status(404).json({Error: 'That user does not exist'})
      }
    })
    .catch(next);
});

// register a new user
router.post("/register", (req, res, next) => {
  const rounds = process.env.HASH_ROUNDS;
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  // TODO: return 'userName was successfully added'?? or user obj
  users
    .register(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

// login
// requires correct 'userId', 'userName' and 'passwordHash'
router.post("/login/:id", (req, res, next) => {
  const info = {
    id: req.params.id,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash,
  };
  users
    .login(info)
    .then(loginRes => {
      if (loginRes !== null) {
        res.status(200).json(loginRes)
      }else{
        //  if user not found
        res.status(404).json({ Error: 'User does not exist' });
      }
    })
    .catch(next);
});

// update a user
router.put("/:id", (req, res, next) => {
  const info = {
    id: req.params.id,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash,
  };
  // TODO: return 'userName was successfully updated? or return user obj
  users
    .updateUser(info)
    .then((user) => {
      res.status(204).json(user);
    })
    .catch(next);
});

// delete a user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  // returns number of affected rows
  users
    .deleteUser(id)
    .then((delRes) => {
      res.status(204).json(delRes);
    })
    .catch(next);
});

module.exports = router;
