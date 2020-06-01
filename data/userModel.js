const db= require('./db_config');

module.exports= {
  find,
  findBy,
  findById,
  addUser,
  updateUser
}

//get all users
function find(){
  return db('user');
}//end find

//find user by id
function findById(id){
  return db('user')
    .where({user_id: id})
    .first();
}//end find

//find user by filter
function findBy(filter){
  const result=  db('user')  
  .where('name', 'like', `%${filter}%`)
  .orWhere('email', 'like', `%${filter}%`)
  .first()
  return result;
}//end findBy

//add new user
function addUser(user){
  return db('user')
    .insert(user)
}//end addUser

//update a user
function updateUser(userInfo, id){
  return db('user')
  .where({user_id: id})
  .update({...userInfo})
}//end updateUser