// user router
const express = require("express");
const router = express.Router();
const {restrict} = require('../data/middleware/restrict');

const users = require("./users-model");

// get all users
router.get("/", restrict, (req, res, next) => {
  users
    .find()
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      } else {
        res.status(200).json("[] No users found");
      }
    })
    .catch(next);
});

// get user by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  users
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        // if user not found
        res.status(404).json({ Error: "That user does not exist" });
      }
    })
    .catch(next);
});

// update a user
router.put("/", (req, res, next) => {
  const info = {
    id: req.body.id,
    userName: req.body.userName,
    email: req.body.email,
    role_Id: req.body.role_Id
  };

  users
    .updateUser(info)
    .then((user) => {
      res.status(200).json(user);
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
      res.status(200).json(delRes);
    })
    .catch(next);
});

module.exports = router;
