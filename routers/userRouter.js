// user router
const express = require("express");
const router = express.Router();

const { users } = require("../models");

// get all users
//  -if logged in
router.get("/", (req, res, next) => {
  users
    .find()
    .then((users) => {
      if (users.length > 0) {
        return res.status(200).json(users);
      }
      res.status(401).json({ Error: "No users found" });
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
        return res.status(200).json(user);
      }
      res.status(401).json({ Error: "User not found" });
    })
    .catch(next);
});

// update a user
router.put("/", (req, res, next) => {
  users
    .updateUser(req.body)
    .then((user) => {
      res.status(200).json({
        user_id: user[0].id,
        user_name: user[0].userName,
        message: "Successully updated",
      });
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
