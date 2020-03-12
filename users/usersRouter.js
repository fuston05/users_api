// express
const express= require('express');

// data or DB 
const users= require('../data/usersData');
const posts= require('../data/postsData');

//Router
const router= express.Router();


//custom middleWare

// ******** routeHandlers ******** //

//add a new user
router.post('/', (req, res) => {
  res.status(200).json({message: "success from '/  post' route"});
});

//add a post to a given user by user id
router.post('/:id/posts', (req, res) => {
  res.status(200).json({message: "success from '/:id/posts, post' route"});
});

//get all users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

//get user by id
router.get('/:id', (req, res) => {
  const currUser= users.filter( user => {
    return parseInt(user.id) === parseInt(req.params.id)
  });
  res.status(200).json(currUser);
});

//get posts from a user by the user id
router.get('/:id/posts', (req, res) => {
  const userid= req.params.id;
  const userPosts= posts.filter( post => {
    return parseInt(post.user_id) === parseInt(userid)
  });
  res.status(200).json(userPosts);
});

//delete a user by id
router.delete('/:id', (req, res) => {
  
  const delUser= users.filter(user => {
    return parseInt(req.params.id) === parseInt(user.id);
  });

  res.status(200).json(delUser);
});

//update a user by user id
router.put('/:id', (req, res) => {
  const userid= req.params.id;

  

  res.status(200).json(updatedUser);
});

module.exports= router;