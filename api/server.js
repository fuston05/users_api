//import express
const express= require('express');

//define server
const server= express();

//point to router
const userRouter= require('../routers/userRouter');

//use json
server.use(express.json());

//use router path
server.use('/api/users', userRouter);

//root route
server.get('/', (req, res) => {
  res.send(`<h1>Welcome to my humble server!</h1>`);
});

//fallback case
server.use(function notFound(){
  res.status(404).json({error: "Could not find what you're looking for"});
})



module.exports= server;