// user router
const express = require("express");
const router = express.Router();

// middleware
const {restrict} = require('../data/middleware/restrict');

const users = require("./users-model");

// get all users, through the 'restrict' middleware, 
// if their role is at LEAST 2(Admin)
router.get("/", restrict(1), (req, res, next) => {
  users
    .find()
    .then((users) => {
      console.log('users: ', users)
      if (users.length) {
        res.status(200).json(users);
      } else {
        res.status(200).json("[] No users found");
      }
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// get user by id
router.get("/:id", restrict(1), (req, res, next) => {
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
    // just passing errors to 'next' for now.
    .catch(next);
});

// update a user
router.put("/", restrict(1), (req, res, next) => {
  const info = {
    id: req.body.id,
    userName: req.body.userName,
    email: req.body.email,
    role_id: req.body.role_id
  };

  users
    .updateUser(info)
    .then((user) => {
      res.status(200).json(user);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// delete a user
router.delete("/:id", restrict(2), (req, res, next) => {
  const { id } = req.params;
  // returns number of affected rows
  users
    .deleteUser(id)
    .then((delRes) => {
      res.status(200).json(delRes);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

module.exports = router;
