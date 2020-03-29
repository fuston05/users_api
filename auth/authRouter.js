const users= require('../data/users-model');
const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');


// /add/register a new user
router.post('/register', (req, res) => {
  const newUserInfo= req.body;
  const password= req.body.password;
  const rounds= process.env.ROUNDS || 10;

  //hash password
  const hash= bcrypt.hashSync(password, parseInt(rounds));

  //update users pass with the hashed pass
  newUserInfo.password= hash;

  //send new user to DB
  users.add(newUserInfo)
  .then(newUser => {
    if(newUser){
      res.status(200).json({message: `Welcome ${newUser}!`});
    }else{
      res.status(404).json({
        error: "Could not add that user" // uername already taken??
      });
    }//end if
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});//end register/add

module.exports= router