// users-model
const db = require("./db-config");

module.exports = {
  find,
  findById,
  updateUser,
  deleteUser,
};

// get all users
function find() {
  return db("users");
}

// get a user by id
function findById(id) {
  return db("users").where({ userId: id }).select('userId', 'userName', 'password');
}

// update a user
function updateUser(info) {
  const { id, userName, password } = info;
  // returns a '1' on success
  return db("users")
    .update({ userName: userName, password: password })
    .where({ userId: id });
}

function deleteUser(id) {
  // returns number of rows affected on success
  return db("users").where({ userId: id }).del();
}
