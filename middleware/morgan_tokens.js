// custom tokens for morgan logger
// ///////////////////////////////////////////
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');

// gets uuid from req for use in morgan as a 'token'
morgan.token('id', (req) => {
  return req.id;
});

// adds a uuid to req
const assignId = (req, res, next) => {
  req.id = uuidv4();
  next();
}

module.exports = {
  assignId
}