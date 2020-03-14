/**HELPERS
  get,
  getById,
  insert,
  update,
  remove,
 */
const express = require('express');
const router = express.Router();
const posts = require('./postDb');
const middleware= require('../common/middleWare');
const validateId= middleware.validateId;
const  scottsLogger= middleware. scottsLogger;

//get all posts
router.get('/', scottsLogger, (req, res) => {
  posts.get()
    .then(postsRes => {
      res.status(200).json(postsRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//get post by ID
router.get('/:id', scottsLogger, validateId, (req, res) => {
  const postId = parseInt(req.params.id);
  posts.getById(postId)
    .then(postIdRes => {
      res.status(200).json(postIdRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//add new post
router.post('/', scottsLogger, (req, res) => {
  const newPost = req.body;
  posts.insert(newPost)
    .then(newPostRes => {
      res.status(200).json(newPostRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//update a post by ID
router.put('/:id', scottsLogger, validateId, (req, res) => {
  const updatePostId = parseInt(req.params.id);
  const updatePostInfo = req.body;
  posts.update(updatePostId, updatePostInfo)
    .then(updatePostRes => {
      res.status(200).json(updatePostRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router

//delete a post by ID
router.delete('/:id', scottsLogger, validateId, (req, res) => {
  const delPostId= parseInt(req.params.id);
  posts.remove(delPostId)
    .then(delPostRes => {
      res.status(200).json(delPostRes)
    })
    .catch(error => {
      res.status(500).json({ error: "We were unable to process your request" })
    })
})//end router


module.exports = router;