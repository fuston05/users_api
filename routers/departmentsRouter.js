// Departments Router
const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const { departments } = require("../models");

// GET all departments
router.get("/", isLoggedIn, (req, res, next) => {
  departments
    .find()
    .then((depRes) => {
      if (depRes) {
        return res.status(200).json(depRes);
      }
      res
        .status(404)
        .json({ Error: "No departments found, please add a department" });
    })
    .catch(next);
});

// GET department by ID
router.get("/:id", isLoggedIn, (req, res, next) => {
  departments
    .findById(req.params.id)
    .then((depIdRes) => {
      if (depIdRes) {
        return res.status(200).json(depIdRes);
      }
      res.status(404).json({Error: "Department not found"})
    })
    .catch(next);
});

module.exports = router;
