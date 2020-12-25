// user router
const express = require("express");
const router = express.Router();

// middleware
const {isLoggedIn} = require("../middleware/isLoggedIn");

const users = require("./users-model");

// get all users, through the 'isLoggedIn' middleware,
router.get("/", isLoggedIn, (req, res, next) => {
  const privilege = res.locals.privilege;
  users
    // pass in the privilege_id
    .find(privilege)
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
router.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const privilege = res.locals.privilege;
  users
    .findById(id, privilege)
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
router.put("/", isLoggedIn, (req, res, next) => {
  const curUserPrivilege = res.locals.privilege;
  const info = {
    id: req.body.id,
    userName: req.body.userName,
    email: req.body.email,
    hire_date: req.body.hire_date,
    salary: req.body.salary,
    privilege_id: req.body.privilege_id,
    employment_info_id: req.body.employment_info_id,
  };

  users
    .updateUser(info, curUserPrivilege)
    .then((user) => {
      res.status(200).json(user);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

// delete a user
router.delete("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const privilege= res.locals.privilege;
  // returns number of affected rows
  users
    .deleteUser(id, privilege)
    .then((delRes) => {
      res.status(200).json(delRes);
    })
    // just passing errors to 'next' for now.
    .catch(next);
});

module.exports = router;
