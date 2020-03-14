/**HELPERS:
 * get,
  getById,
  getUserPosts,
  insert,
  update,
  remove, */
const express = require('express');
const router = express.Router();
const users = require('./userDb');
const middleware= require('../common/middleWare');
const validateId= middleware.validateId;
const scottsLogger= middleware.scottsLogger;

//get all users
router.get('/', scottsLogger, (req, res) => {
  users.get()
    .then(usersRes => {
      res.status(200).json(usersRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//get a user by ID
router.get('/:id', scottsLogger, validateId, (req, res) => {
  const userId = parseInt(req.params.id);
  users.getById(userId)
    .then(userIdRes => {
      res.status(200).json(userIdRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//add a new user
router.post('/', scottsLogger, (req, res) => {
  const userInfo = req.body;
  users.insert(userInfo)
    .then(newUserRes => {
      res.status(200).json(newUserRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//update a user by ID
router.put('/:id', scottsLogger, validateId, (req, res) => {
  const updateId = parseInt(req.params.id);
  const updateInfo = req.body;
  users.update(updateId, updateInfo)
    .then(updateUserRes => {
      res.status(200).json(updateUserRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//delete a user by ID
router.delete('/:id', scottsLogger, validateId, (req, res) => {
  const delId = parseInt(req.params.id);
  users.remove(delId)
    .then(delRes => {
      res.status(200).json(delRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//get posts for a user by user-ID
router.get('/:id/posts', scottsLogger, validateId, (req, res) => {
  const userPostsId= parseInt(req.params.id);
  users.getUserPosts(userPostsId)
    .then(userPostRes => {
      res.status(200).json(userPostRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

module.exports = router;