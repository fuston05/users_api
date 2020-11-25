// auth router
const express = require('express');
const router = express.Router();

const auth = require('./auth-model');

router.post('/register', (req, res) => {
  auth.add()
});

module.exports = router;