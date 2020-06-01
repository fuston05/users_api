const express= require('express');

//define the router
const router= express.Router();

//connect the model
const users= require('../data/userModel');

// get all users or filter users
router.get('/', (req, res) => {
  if(req.query.filter){
    const filter= (req.query.filter);
  
  //filter user if query param exists
  users.findBy(filter)
    .then(filterRes => {
      console.log('successful found filtered user: ', filterRes);
      res.status(200).json(filterRes);
    })
    .catch(error => {
      console.log('error: ', error);
      res.status(500).json({"error": "Could not process your request."});
    })

  }else{
  
    //find all users if no query param
  users.find()
      .then(userRes => {
        console.log('successful found users: ', userRes);
        res.status(200).json(userRes);
      })
      .catch(error => {
        console.log('error: ', error);
        res.status(500).json({"error": "Could not process your request."});
      })
    }//end if/else
});//end get all users

router.get('/:id', (req, res) => {
  const id= req.params.id;

  users.findById(id)
    .then(userRes => {
      if(userRes){
      res.status(200).json(userRes);
      }else{
        res.status(404).json({"error": "Could not find that user"});
      }
    })
    .catch(error => {
      console.log('error: ', error);
      res.status(500).json({"error": "Could not process your request"});
    })
});//end get user by id

//add a new user
router.post('/', (req, res) => {
  const user= req.body;
  users.addUser(user)
    .then(addRes => {
      console.log('addRes: ', addRes);
      res.status(201).json({"message": "User added successfully"})
    })
    .catch(error => {
      console.log('error: ', error);
      res.status(500).json({"error": "User already exists"});
    })
});//end add user



module.exports= router;