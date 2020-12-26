// users-model, shared by userRouter, and authRouter
const db = require("../db-config");

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
  console.log("user: ", user);
  // make sure username or email not already in use
  const regNameResp = await userNameExists(user.userName);
  const regEmailResp = await userEmailExists(user.email);
  console.log('regNameResp: ', regNameResp)
  console.log('regEmailResp: ', regEmailResp)

  if (regNameResp === true) {
    return {Error: 'That user name is already in use'}
  }

  if (regEmailResp === true) {
    return {Error: 'That email is already in use'}
  }
  return db("users").insert({ ...user }, ['id', 'userName']);
}

const userNameExists = async (userName) => {
  const nameResp = await db('users').where({ userName }).first()
  if (nameResp && nameResp.id) {
    return true;
  }
  return false;
};

const userEmailExists = async (email) => {
  const emailResp = await db('users').where({ email }).first()
  if (emailResp && emailResp.id) {
    return true;
  }
  return false;
};

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
