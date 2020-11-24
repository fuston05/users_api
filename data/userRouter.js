// user router
const express = require("express");
const router = express.Router();

const users = require("./users-model");

router.get("/poop", (req, res) => {
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

module.exports = router;
