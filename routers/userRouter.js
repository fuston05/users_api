const express= require('express');

//define the router
const router= express.Router();

//connect the model
const users= require('../data/userModel');

router.get('/users', (req, res) => {
  users.find()
    .then(userRes => {
      console.log('successful find users: ', userRes);
      res.status(200).json(userRes);
    })
    .catch(error => {
      console.log('error: ', error);
      res.status(500).json({"error": "Could not process your request."});
    })
})



module.exports= router;