// users-model, shared by userRouter, and authRouter
const db = require("./db-config");

module.exports = {
  find,
  findById,
  getPersonalInfo,
  login,
  register,
  updateUser,
  deleteUser,
};

// get all users
function find() {
  return db("users");
}

// get a user by id
function findById(id) {
  return db("users").where({ id }).first().select("id", "userName");
}

// get user info (with password) by id, for internal use in the 'login' function below
function getPersonalInfo(id) {
  return db("users").where({ id: id }).select("id", "userName", "password");
}

// add a new user
async function register(user) {
  const { userName, password, email, role_Id } = user;
  // check if username already exists
  const userExists = await db("users").where({ userName: userName });
  // return 'id' on success, error message if user already exists
  if (userExists.length) {
    return { Error: "User already exists" };
  }

  return db
    .insert({
      userName: userName,
      password: password,
      email: email,
      role_Id: role_Id,
    })
    .into("users")
    .returning("id");
}

// login
async function login(info) {
  const { id } = info;
  const user = await getPersonalInfo(id);
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
