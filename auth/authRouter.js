const users = require('../data/users-model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// /add/register a new user
router.post('/register', (req, res) => {
  const newUserInfo = req.body;
  const password = req.body.password;

  //validation
  if (!newUserInfo.username) {
    res.status(400).json({ message: 'Missing required field: username' })
  } else if (!newUserInfo.first_name || !newUserInfo.last_name) {
    res.status(400).json({ message: 'Missing required field(s): first name, last name' })
  } else if (!newUserInfo.email) {
    res.status(400).json({ message: 'Missing required field: email' })
  } else if (!newUserInfo.password) {
    res.status(400).json({ message: 'Missing required field: password' })
  } else if (!newUserInfo.role) {
    res.status(400).json({ message: 'Missing required field: role' })
  } else {// all is valid

    const rounds = process.env.ROUNDS || 10;
    //hash password
    const hash = bcrypt.hashSync(password, parseInt(rounds));
    //update users pass with the hashed pass
    newUserInfo.password = hash;

    //send new user to DB
    users.add(newUserInfo)
      .then(newUser => {
        res.status(201).json({ error: `Welcome, ${newUser}` });
      })
      .catch(error => {
        res.status(500).json({ error: "That user already exists" });
      })

  }//end if/else validation

});//end register/add

module.exports = router