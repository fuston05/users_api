// users-model
const db = require("./db-config");

module.exports = {
  find,
  findById,
  addUser,
  updateUser,
  deleteUser,
};

// get all users
function find() {
  return db("users");
}

// get a user by id
function findById(id) {
  return db("users").where({ userId: id });
}

// add a new user
function addUser(user) {
  const { userName, passwordHash } = user;
  // returns "userId" on success
  // TODO: return user obj
  return db
    .insert({ userName: userName, passwordHash: passwordHash })
    .into("users");
}

// update a user
function updateUser(info) {
  const { id, userName, passwordHash } = info;
  // returns a '1' on success
  // TODO: return user obj
  return db("users")
    .update({ userName: userName, passwordHash: passwordHash })
    .where({ userId: id });
}

function deleteUser(id) {
  // returns number of rows affected on success
  return db("users").where({ userId: id }).del()
}
