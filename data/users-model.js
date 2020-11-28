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
  return db("users")
    .where({ userId: id })
    .select("userId", "userName", "password");
}

// add a new user
async function register(user) {
  const { userName, password } = user;
  // check if username already exists
  if (await db("users").where({ userName: user.userName })) {
    return "Error: that user already exists";
  }
  // returns "userId" on success
  return db.insert({ userName: userName, password: password }).into("users");
}

// login
async function login(info) {
  const { id } = info;
  const user = await findById(id);
  // if user is found
  if (user.length) {
    return user[0];
  } else {
    // if user not found
    return null;
  }
}

// update a user
function updateUser(info) {
  const { id, userName, passwordHash } = info;
  // returns a '1' on success
  return db("users")
    .update({ userName: userName, passwordHash: passwordHash })
    .where({ userId: id });
}

function deleteUser(id) {
  // returns number of rows affected on success
  return db("users").where({ userId: id }).del();
}
