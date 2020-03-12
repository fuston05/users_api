const express= require('express');
const cors= require('cors');
const helmet= require('helmet');

const server= express();

//'use' global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

//custom middleware

//routes
const usersRouter= require('../users/usersRouter');
const postsRouter= require('../posts/postsRouter');

//assign routers
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

//root route
server.get('/', (req, res) => {
  res.send(` <h2>Welcome to my api server</h2> `);
});

//fallback route
server.use(function notFound(req, res){
  res.status(404).json({
    error: "We could not find what you are looking for"
  });
});



module.exports= server;