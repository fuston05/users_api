// employment info router
const { json } = require('express');
const express = require('express');
const router = express.Router();

// middleware
const {restrict} = require('../middleware/restrict');
// model
const employment = require('./employment_model');

router.get('/', restrict(2), (req, res, next) => {
  employment
    .find()
    .then(result => {
      res.status(200).json(result);
    })
  .catch(next)
})

module.exports = router;

