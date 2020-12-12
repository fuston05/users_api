// user router
const express = require("express");
const router = express.Router();

const users = require("./users-model");

// get all users
router.get("/", (req, res, next) => {
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
    password: req.body.password,
  };
  // TODO: return 'userName was successfully updated? or return user obj
  users
    .updateUser(info)
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      } else {
        res.status(204).json({ Error: "That user name already exists." });
      }
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
