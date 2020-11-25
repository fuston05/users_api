// users-model
const db = require("./db-config");

module.exports = {
  find,
  findById,
  register,
  login,
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
function register(user) {
  const { userName, passwordHash } = user;
  // returns "userId" on success
  // TODO: return user obj
  return db
    .insert({ userName: userName, passwordHash: passwordHash })
    .into("users");
}

// login
// requires correct 'userId', userName' and 'passwordHash'
async function login(info) {
  const { id, userName, passwordHash } = info;
  const user = await findById(id);
  // if userId is found
  if (user.length) {

    if (user[0].userName === userName && user[0].passwordHash === passwordHash) {
      return db("users").where({
        userName: userName,
        passwordHash: passwordHash,
      });
    } else {
      // if credentials don't match
      return 'Error: Invalid credentials';
    }

  } else {
    // if user not found
    return null;
  }
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
  return db("users").where({ userId: id }).del();
}
