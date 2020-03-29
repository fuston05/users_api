const users= require('./users-model');
const express= require('express');
const router= express.Router();

//find all users, returns all info
router.get('/', (req, res) => {
  users.find()
  .then(users => {
    if(users.length > 0){
      res.status(200).json(users);
    }else{
      res.status(404).json({error: "There are no users in the database"});
    }//end if
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});//end find all users

//find user by id - returns username and user_id
router.get('/:id', (req, res) => {
  const id= parseInt(req.params.id);
  users.findById(id)
  .then(user => {
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({error: "Could not find that user"});
    }//end if
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});//end findById

//delete a user
router.delete('/:id', (req, res) => {
  const id= parseInt(req.params.id);
  users.remove(id)
  .then(delUser => {
    if(delUser){
      res.status(200).json({message: `User: ${delUser.username} successfully deleted`});
    }else{
      res.status(404).json({error: "Could not find that user"});
    }//end if
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});//end findById

//edit a user
router.put('/:id', (req, res) => {
  const id= parseInt(req.params.id);
  const userInfo= req.body;
  users.edit(id, userInfo)
  .then(upDatedUser => {
    if(upDatedUser){
      res.status(200).json({message: `User: ${upDatedUser.username} successfully updated`});
    }else{
      res.status(404).json({error: "Could not find that user"});
    }//end if
  })
  .catch(error => {
    res.status(500).json({error: "Could not process your request"});
  })
});//end edit


module.exports= router