// *** Departments Router ***
const express = require("express");
const router = express.Router();

const { common, departments } = require("../models");

// GET all departments
router.get("/", (req, res, next) => {
  departments
    .find()
    .then((depRes) => {
      console.log("departments: ", depRes);
      if (depRes) {
        // restructure result
        depRes.map((dep) => {
          // add 'manager' key
          dep.manager = `${dep.firstName} ${dep.lastName}`;

          // add 'manager_link' key to manager(user) resource
          dep.manager_link = `${req.protocol}://${req.headers.host}/users/${dep.manager_id}`
          
          // delete, not needed anymore in the result
          delete dep.firstName;
          delete dep.lastName;
        });
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
  const { id } = req.params;
  common
    .getResourceBy({ id: id }, "departments")
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
  const checkDeptExists = await common.getResourceBy(
    { department: req.body.department },
    "departments"
  );

  if (checkDeptExists) {
    return res.status(409).json({
      Error: `That department name '${checkDeptExists.department}' is already in use`,
    });
  }

  common
    .addResource(req.body, "departments")
    .then((createRes) => {
      res.status(201).json(createRes);
    })
    .catch(next);
});

// Update existing department
router.put("/", async (req, res, next) => {
  // make sure department name exists
  const checkDeptExists = await common.getResourceBy(
    { id: req.body.id },
    "departments"
  );

  if (!checkDeptExists) {
    return res.status(404).json({
      Error: `The Department id '${req.body.id}' does not exist`,
    });
  }
  common
    .updateResource(req.body, "departments")
    .then((updateRes) => {
      res.status(200).json(updateRes[0]);
    })
    .catch(next);
});

// Delete an existing department by ID
router.delete("/:id", async (req, res, next) => {
  // check department id exists
  const checkDeptExists = await common.getResourceBy(
    { id: req.params.id },
    "departments"
  );

  if (!checkDeptExists) {
    return res
      .status(404)
      .json({ Error: `The privilege id '${req.params.id}' does not exist` });
  }

  common
    .deleteResource(req.params.id, "departments")
    .then((delRes) => {
      if (delRes) {
        checkDeptExists.message = "Successfully Deleted";
        return res.status(200).json(checkDeptExists);
      }
    })
    .catch(next);
});

module.exports = router;
