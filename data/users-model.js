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
  const { userName, password } = user;
  // returns "userId" on success
  // TODO: return user obj
  return db.insert({ userName: userName, password: password }).into("users");
}

// login
async function login(info) {
  const { id, userName, password} = info;
  const user = await findById(id);
  // if user is found
  if (user.length) {
    return db("users").where({
      userName: userName,
      password: password,
    });
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
