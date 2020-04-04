const db = require('../config/db_config');

module.exports = {
  find,
  findBy,
  findById,
  edit,
  remove,
  add
}

//add/register uer
function add(newUserInfo) {
  const name = newUserInfo.username;
  //return username
  return db('users')
    .insert(newUserInfo)
    .then(() => {
      return name;
    })
}// end add user/register

//find all users, returns all info
function find() {
  return db('users').select(
    'user_id', 
    'username',
    'first_name',
    'last_name',
    'email',
    'phone',
    'address',
    'role'
  );
}//end find

// find a user by whatever filter is passed in, returns user
function findBy(filter) {
  return db('users')
  .where(filter)
  .first();
}//end findBy

//find a user by id, returns id and username
function findById(id) {
  return db('users')
    .select(
      'user_id', 
      'username',
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'role')
    .where({ 'user_id': id })
}//end findById

//edit user, returns updated username in a success message
async function edit(id, userInfo) {
  const { user_id } = await findById(id);
  return db('users')
    .where({ 'user_id': id })
    .update(userInfo, 'user_id')
    .then(() => {
      return userInfo;
    })
}//end edit

//delete a user, returns a success message containing the username that was deleted
async function remove(id) {
  const delUser = await findById(id);
  return db('users')
    .where({ 'user_id': id })
    .del()
    .then(() => {
      return delUser[0];
    })
}//end delete user


