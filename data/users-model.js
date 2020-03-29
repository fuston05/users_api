const db= require('../config/db_config');

module.exports= {
  find,
  findBy,
  findById,
  edit,
  remove
}

function find(){
  return db('users').select(
    '*'
    // 'user_id', 
    // 'username'
    );
}//end  

function findBy(filter){
  return db('users')
  .where(filter)
  .select(
    'user_id', 
    'username');
}//end

function findById(id){
  return db('users')
  .where({'user_id': id})
  .select(
    'user_id', 
    'username'
    );
}//end

//edit user, returns updated username in a success message
async function edit(id, userInfo){
  const {user_id}= await findById(id);
  return db('users')
  .where({'user_id': id})
  .update(userInfo, 'user_id')
  .then(() => {
    return userInfo;
  })
}//end edit

//delete a user, returns a success message containing the username that was deleted
async function remove(id){
  const delUser= await findById(id);
  return db('users')
  .where({'user_id': id})
  .del()
  .then(() => {
    return delUser[0];
  })
}//end delete user


