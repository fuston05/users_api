/**
 * defines and exports the server with root route, use json and use router, and fallback endpoint case
 */


//import express
const express= require('express');

const helmet= require('helmet');
const cors= require('cors');

//define server
const server= express();

//point to router
const userRouter= require('../users/userRouter');

//use json
server.use(express.json());

server.use(helmet());
server.use(cors());

//use router path
server.use('/api/users', userRouter);

//root route
server.get('/', (req, res) => {
  res.send(`<h1>Welcome to my humble server!</h1>`);
});

//fallback case
server.use(function notFound(req, res){
  res.status(404).json({error: "Could not find what you're looking for"});
})

module.exports= server;