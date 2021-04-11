// *** Privileges Router ***

const express = require("express");
const router = express.Router();

const {common } = require("../models");

// GET all provileges info
router.get("/", (req, res, next) => {
  common
    .getAllResource('privileges')
    .then((privRes) => {
      if (privRes) {
        return res.status(200).json(privRes);
      }
      res
        .status(404)
        .json({ Error: "No privileges found, please add a privilege" });
    })
    .catch(next);
});

// GET privilege by ID
router.get("/:id", (req, res, next) => {
  common
    .getResourceBy({id: req.params.id}, 'privileges')
    .then((privRes) => {
      if (privRes) {
        return res.status(200).json(privRes);
      }
      res.status(404).json({ Error: "Privilege not found" });
    })
    .catch(next);
});

// Create a New Privilege
router.post("/", async (req, res, next) => {
  // if privilege name is already in use
  const checkPrivExists = await common.getResourceBy({privilege: req.body.privilege}, 'privileges');

  if (checkPrivExists) {
    return res.status(409).json({
      Error: `That privilege name '${checkPrivExists.privilege}' is already in use`,
    });
  }
  common
    .addResource(req.body, 'privileges')
    .then((createRes) => {
      res.status(201).json(createRes[0]);
    })
    .catch(next);
});

// Edit Existing Privilege
router.put("/", async (req, res, next) => {
  // make sure the privilege exists
  const checkPrivExists = await common.getResourceBy({id: req.body.id}, 'privileges');
  if (!checkPrivExists) {
    return res.status(404).json({
      Error: `The privilege id '${req.body.id}' does not exist`,
    });
  }

  common
    .updateResource(req.body, 'privileges')
    .then((updateRes) => {
      res.status(200).json(updateRes[0]);
    })
    .catch(next);
});

// DELETE a privilege
router.delete("/:id", async (req, res, next) => {
  // TODO: make sure no user has this privilege, cannot delete if in use due to foriegn key constraints.

  // make sure privilege exists
  const checkPrivExists = await common.getResourceBy({ id: req.params.id }, 'privileges');

  if (!checkPrivExists) {
    return res
      .status(404)
      .json({ Error: `The privilege id '${req.params.id}' does not exist` });
  }

  // Delete the privilege
  common
    .deleteResource(req.params.id, 'privileges')
    .then((delRes) => {
      if (delRes) {
        checkPrivExists.message = "Successfully Deleted";
        return res.status(200).json(checkPrivExists);
      }
    })
    .catch(next);
});

module.exports = router;
