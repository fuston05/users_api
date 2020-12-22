// user router
const express = require("express");
const router = express.Router();

// middleware
const { restrict } = require("../middleware/restrict");

const users = require("./users-model");

// get all users, through the 'restrict' middleware,
// if their privilege is at LEAST 2(Admin)
router.get("/", restrict(1), (req, res, next) => {
  const privilege_id = res.locals.privilege_id;
  users
    // pass in the privilege_id
    .find(privilege_id)
    .then((users) => {
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
  const privilege_id = res.locals.privilege_id;
  users
    .findById(id, privilege_id)
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
  const curUserPrivilegeId = res.locals.privilege_id;
  const info = {
    id: req.body.id,
    userName: req.body.userName,
    email: req.body.email,
    salary: req.body.salary,
    privilege_id: req.body.privilege_id,
    employment_info_id: req.body.employment_info_id,
  };

  users
    .updateUser(info, curUserPrivilegeId)
    .then((user) => {
      res.status(200).json(user);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// delete a user
router.delete("/:id", restrict(2), (req, res, next) => {
  const { id } = req.params;
  const privilege_id = res.locals.privilege_id;
  // returns number of affected rows
  users
    .deleteUser(id, privilege_id)
    .then((delRes) => {
      res.status(200).json(delRes);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

module.exports = router;
