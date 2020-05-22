const db= require('./db_config');

module.exports= {
  find
}

function find(){
  return db('users');
}//end find