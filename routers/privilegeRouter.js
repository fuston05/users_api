// privileges Router
const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const { privileges } = require("../models");

router.get("/", isLoggedIn, (req, res, next) => {
  privileges
    .find()
    .then((privRes) => {
      if (privRes) {
        return res.status(200).json(privRes)
      }
      res.status(404).json({"Message": "No privileges found, please add a privilege"})
    })
    .catch(next);
});


module.exports = router;
