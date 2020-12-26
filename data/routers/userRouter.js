// user router
const express = require("express");
const router = express.Router();

const {isLoggedIn} = require("../../middleware");

const users = require("./users-model");

// get all users 
//  -if logged in
router.get("/", isLoggedIn, (req, res, next) => {
  users
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// get user by id
router.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  users
    .findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});


// update a user
router.put("/", (req, res, next) => {
  users
    .updateUser(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// delete a user
router.delete("/:id", isLoggedIn, (req, res, next) => {
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