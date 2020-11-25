// user router
const express = require("express");
const router = express.Router();

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
        res.status(200).json(users);
    })
    .catch(next)
});

// register a new user
router.post("/register", (req, res, next) => {
  const user = req.body;
  // TODO: return 'userName was successfully added'?? or user obj
  users
    .addUser(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

// update a user
router.put('/:id', (req, res, next) => {
  const info = {
    id: req.params.id,
    userName: req.body.userName,
    passwordHash: req.body.passwordHash
  }
  // TODO: return 'userName was successfully updated? or return user obj
  users.updateUser(info)
    .then(user => {
      res.status(204).json(user)
    })
    .catch(next)
});

// delete a user
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  // returns number of affected rows
  users.deleteUser(id)
    .then(delRes => {
      res.status(204).json(delRes)
    })
  .catch(next)
});

module.exports = router;
