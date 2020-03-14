const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const server = express();
const usersRouter = require('../users/usersRouter');
const postsRouter = require('../posts/postsRouter');


server.use(cors());
server.use(helmet());
server.use(morgan());
server.use(express.json());

//routers
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

//root case
server.get('/', (req, res) => {
  res.send(` <h1>Welcome to my practice API!</h1> `);
});

//fallback case
server.use((req, res) => {
  res.status(404).json({ error: "We were unable to process your request" });
});

module.exports = server;