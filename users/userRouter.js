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
      if(filterRes){
        res.status(200).json(filterRes);
      }else{
        console.log('nothing found');
        res.status(404).json({"message": "No search results"});
      }
    })
    .catch(error => {
      res.status(500).json({"error": "Could not process your request."});
    })

  }else{
  
    //find all users if no query param
  users.find()
      .then(userRes => {
        res.status(200).json(userRes);
      })
      .catch(error => {
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
      res.status(500).json({"error": "Could not process your request"});
    })
});//end get user by id

//add a new user
router.post('/', (req, res) => {
  const user= req.body;
  users.addUser(user)
    .then(addRes => {
      res.status(201).json({"message": "User added successfully"})
    })
    .catch(error => {
      res.status(500).json({"error": "User already exists"});
    })
});//end add user

//update user
router.put('/:id', (req, res) => {
  const userInfo= req.body;
  const id= req.params.id;

  users.updateUser(userInfo, id)
    .then(updateRes => {
      res.status(200).json({"message": "User updated successfully"})
    })
    .catch(error => {
      res.status(500).json({"error": "Could not update user"});
    })
});//end updateUser

//delete a user
router.delete('/:id', (req, res) => {
  const id= req.params.id;

  users.deleteUser(id)
  .then(delRes => {
    if(delRes){
      res.status(200).json({"message": "User successfully deleted"})
    }else{
      res.status(404).json({"message": "User not found"})
    }
  })
  .catch(error => {
    res.status(500).json({"error": "Could not process your request"});
  })

});//end delete user


module.exports= router;