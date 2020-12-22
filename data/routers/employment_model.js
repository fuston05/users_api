// employment info model
const db = require('../db-config');

module.exports = {
  find
}

// 
function find(){
  return db('employment_info')

}