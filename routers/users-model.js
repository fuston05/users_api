// users-model, shared by userRouter, and authRouter
// /////////////////////////////////////////////////
const db = require("../data/db-config");

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
  // validation is handled prior in the registerValidation middleware
  // password is hashed in the authRouter

  // remove the 'confirm password' from the req.body before inserting to DB
  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    current_salary,
    hire_date,
    department_id,
    job_title_id,
    privilege_id,
  } = user;

  return db("users").insert(
    {
      firstName,
      lastName,
      userName,
      password,
      email,
      current_salary,
      hire_date,
      department_id,
      job_title_id,
      privilege_id,
    },
    ["id", "userName"]
  );
}

// login
function login(user) {
  // validation is handled prior in the registerValidation middleware
  return "not set up yet";
}

// update a user
function updateUser(user) {
  // validation is handled prior in the registerValidation middleware
  return "not set up yet";
}

function deleteUser(id) {
  return "not set up yet";
}