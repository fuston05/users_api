// user router
const express = require("express");
const router = express.Router();

const users = require("./users-model");

router.get("/", (req, res) => {
  users
    .find()
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ error: "No users found" });
      }
    })
    .catch((usersError) => {
      res.status(500).json({ error: "Server Error" });
    });
});

module.exports = router;
