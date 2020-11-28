// auth model
const db = require("../db-config");

module.exports = {
  login,
  register,
  findById,
};

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
  const userExists = await db('users').where({ userName: user.userName });
  if (userExists.length) {
    return "Error: User already exists";
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
