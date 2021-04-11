// Departments Router
const express = require("express");
const dbConfig = require("../data/db-config");
const router = express.Router();

const { departments } = require("../models");

// GET all departments
router.get("/", (req, res, next) => {
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
router.get("/:id", (req, res, next) => {
  departments
    .findById(req.params.id)
    .then((depIdRes) => {
      if (depIdRes) {
        return res.status(200).json(depIdRes);
      }
      res.status(404).json({ Error: "Department not found" });
    })
    .catch(next);
});

// Create a new department
router.post("/", async (req, res, next) => {
  // make sure department name does not already exist
  const checkDeptExists = await departments.findByName(req.body.department);

  if (checkDeptExists) {
    return res.status(409).json({
      Error: `That department name '${checkDeptExists.department}' is already in use`,
    });
  }

  departments
    .createDept(req.body)
    .then((createRes) => {
      res.status(201).json(createRes);
    })
    .catch(next);
});

// Update existing department
router.put("/", async (req, res, next) => {
  // make sure department name exists
  const checkDeptExists = await departments.findById(req.body.id);

  if (!checkDeptExists) {
    return res.status(404).json({
      Error: `The Department id '${req.body.id}' does not exist`,
    });
  }
  departments
    .updateDept(req.body)
    .then((updateRes) => {
      res.status(200).json(updateRes[0]);
    })
    .catch(next);
});

// Delete an existing department by ID
router.delete("/:id", async (req, res, next) => {
  // check department id exists
  const checkDeptExists = await departments.findById(req.params.id);

  if (!checkDeptExists) {
    return res.status(404).json({ Error: `The privilege id '${req.params.id}' does not exist` });
  }

  departments
    .deleteDept(req.params.id)
    .then((delRes) => {
      if (delRes) {
        checkDeptExists.message = "Successfully Deleted";
        return res.status(200).json(checkDeptExists);
      }
    })
    .catch(next);
});

module.exports = router;
