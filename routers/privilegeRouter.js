// privileges Router
const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const { privileges } = require("../models");

router.get("/", (req, res, next) => {
  privileges
    .find()
    .then((privRes) => {
      console.log("privRes: ", privRes);
      res.status(200).json(privRes)
    })
    .catch(next);
});


module.exports = router;
