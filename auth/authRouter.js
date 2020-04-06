const users = require('../data/users-model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/token');
const { registerIfNotExists } = require('../utils/userRegistration');

//add/register a new user
router.post('/register', (req, res) => {
  const newUserInfo = req.body;
  const password = req.body.password;

  //validation
  if (!newUserInfo.username) {
    res.status(400).json({ message: 'Missing required field: username' });
  } else if (!newUserInfo.first_name || !newUserInfo.last_name) {
    res.status(400).json({ message: 'Missing required field(s): first name, last name' });
  } else if (!newUserInfo.email) {
    res.status(400).json({ message: 'Missing required field: email' });
  } else if (!newUserInfo.password) {
    res.status(400).json({ message: 'Missing required field: password' });
  } else {// ...all is valid

    const rounds = process.env.ROUNDS || 8;
    //hash password
    const hash = bcrypt.hashSync(password, parseInt(rounds));
    //update users pass with the hashed pass
    newUserInfo.password = hash;
    //if all is valid and username or email is not in use
    //then register the user
    registerIfNotExists(res, newUserInfo);

  }//end if/else validation
});//end register/add

//login, returns welcome w/ username, and token
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  //verify
  users.findBy({ username })
    .then(user => {
      if (user &&
        bcrypt.compareSync(password, user.password)
      ) {
        //set/send a token
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome, ${user.username}`, token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Could not process your request" });
    })
});// end login

module.exports = router;