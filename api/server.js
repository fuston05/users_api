// server.js  
const express = require('express');
const server = express();
const helmet = require('helmet');

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = server;