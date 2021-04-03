// user router
const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");

const { users } = require("../models");

// get all users
//  -if logged in
router.get("/", isLoggedIn, (req, res, next) => {
  users
    .find()
    .then((users) => {
      if (users.length > 0) {
        return res.status(200).json(users);
      }
      res.status(401).json({ Error: "No users found" });
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
      if (user) {
        return res.status(200).json(user);
      }
      res.status(401).json({ Error: "User not found" });
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// update a user
router.put("/", (req, res, next) => {
  users
    .updateUser(req.body)
    .then((user) => {
      console.log("user: ", user[0]);
      res.status(200).json({
        user_id: user[0].id,
        user_name: user[0].userName,
        message: "Successully updated",
      });
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
