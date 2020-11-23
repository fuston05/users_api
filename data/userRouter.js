// user router
const express = require("express");
const router = express.Router();

const users = require("./users-model");

router.get("/", (req, res, next) => {
  users
    .find()
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      } else {
        // TODO: add errors to a log file?
        res.status(404).json({ error: "No users found" });
      }
    })
    .catch(next)
});

module.exports = router;
