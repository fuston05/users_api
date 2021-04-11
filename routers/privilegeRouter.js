// privileges Router
const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const { privileges } = require("../models");

// GET all provileges info
router.get("/", isLoggedIn, (req, res, next) => {
  privileges
    .find()
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
router.get("/:id", isLoggedIn, (req, res, next) => {
  privileges
    .findById(req.params.id)
    .then((privRes) => {
      if (privRes) {
        return res.status(200).json(privRes);
      }
      res.status(404).json({ Error: "Privilege not found" });
    })
    .catch(next);
});

// Create a New Privilege
router.post("/", isLoggedIn, async (req, res, next) => {
  // if privilege name is already in use
  const checkPrivExists = await privileges.findByName(req.body.privilege);

  if (checkPrivExists) {
    return res
      .status(409)
      .json({ Error: "That privilege name is already in use" });
  }
  privileges
    .createPrivilege(req.body)
    .then((createRes) => {
      res.status(201).json(createRes[0]);
    })
    .catch(next);
});

// Edit Existing Privilege
router.put("/", isLoggedIn, async (req, res, next) => {
  // make sure the privilege exists
  const checkPrivExists = await privileges.findById(req.body.id);
  if (!checkPrivExists) {
    return res.status(404).json({ Error: "The privilege id does not exist" });
  }

  privileges
    .updatePrivilege(req.body)
    .then((updateRes) => {
      console.log('updateRes: ', updateRes)
      res.status(200).json(updateRes[0]);
    })
    .catch(next);
});

// DELETE a privilege
router.delete("/:id", isLoggedIn, async (req, res, next) => {
  // make sure privilege exists
  const checkPrivExists = await privileges.findById(req.params.id);

  if (!checkPrivExists) {
    return res.status(404).json({ Error: "The privilege id does not exist" });
  }

  // Delete the privilege
  privileges
    .deletePrivilege(req.params.id)
    .then((delRes) => {
      if (delRes) {
        checkPrivExists.message = "Successfully Deleted";
        return res.status(200).json(checkPrivExists);
      }
    })
    .catch(next);
});

module.exports = router;
