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
router.post("/", async (req, res, next) => {

  // if privilege name is already in use
  const checkPrivExists = await privileges.findByName(req.body.privilege)

  if (checkPrivExists) {
    return res.status(409).json({Error: "That privilege name is already in use"})
  }
  privileges.createPrivilege(req.body).then(createRes => {
    res.status(201).json(createRes)

  }).catch(next);
});

module.exports = router;
