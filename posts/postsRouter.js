const express= require('express');
const posts= require('../data/postsData');

const router= express.Router();

// *********** route handlers *********** //

//get all posts
router.get('/', (req, res) => {
  res.status(200).json({message: "success from '/' route"});
});

//get a post by post id
router.get('/:id', (req, res) => {
  res.status(200).json({message: "success from '/:id' route"});
});

//delete a post by its id
router.delete('/:id', (req, res) => {
  res.status(200).json({message: "success from '/:id, delete' route"});
});

//update/edit a post by its id
router.put('/:id', (req, res) => {
  res.status(200).json({message: "success from '/:id, put' route"});
});

module.exports= router;