// users-model
const db = require('./users.db');

module.exports = {
  find,
}

function find() {
  return db('users')
}