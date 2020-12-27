// users-model, shared by userRouter, and authRouter
// /////////////////////////////////////////////////
const db = require("../data/db-config");
// model_utils
const { userCredsExist } = require('./model_utils');

module.exports = {
  find,
  findById,
  findByUserName,
  findByEmail,
  login,
  register,
  updateUser,
  deleteUser,
};

// get all users
function find() {
  return "not set up yet";
}

// get a user by id
function findById(id) {
  return "not set up yet";
}

// get a user by userName
// just for internal use/helper at the moment
function findByUserName(userName) {
  return db("users").where({ userName });
}
// get a user by email
// just for internal use/helper at the moment
function findByEmail(email) {
  return db("users").where({ email }).first().select("id", "userName", "email");
}

// add a new user
async function register(user) {
  // make sure username or email not already in use
  const regNameResp = await userCredsExist({userName: user.userName});
  const regEmailResp = await userCredsExist({email: user.email});

  // if userName already in use
  if (regNameResp === true) {
    return {Error: 'That user name is already in use'}
  }
  // if email already in use
  if (regEmailResp === true) {
    return {Error: 'That email is already in use'}
  }
  return db("users").insert({ ...user }, ['id', 'userName']);
}

// login
function login(user) {
  return "not set up yet";
}

// update a user
function updateUser(user) {
  return "not set up yet";
}

function deleteUser(id) {
  return "not set up yet";
}
