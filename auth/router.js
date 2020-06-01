//environment
require('dotenv').config();
//encryption
const bcrypt= require('bcryptjs');

//express
const express= require('express');
//router
const router= express.Router();
//model
const users= require('../users/userModel');

//register route handler
router.post('/register', (req, res) => {
  //userInfo
  const userInfo= req.body;

  //int rounds for hashing
  const rounds= parseInt(process.env.HASHING_ROUNDS) || parseInt(10);

  //hash the password "hashsync(password, rounds)"
  const hash= bcrypt.hashSync(userInfo.password, rounds);

  //assign hash to "const password"
  userInfo.password= hash;

  //route handler
  users.addUser(userInfo)
    .then(addRes => {
      console.log('res: ', addRes);
      res.status(201).json({"message": "User successfully created"})
    })
    .catch(error => {
      res.status(500).json({"error": "Could not create user. User already exists"});
    })

});//end register route

module.exports= router;