// Departments Router
const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const departments = require('../routers');


module.exports = router;