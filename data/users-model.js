// users-model, shared by userRouter, and authRouter
const db = require("./db-config");

module.exports = {
  find,
  findById,
  findByUserName,
  findByEmail,
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
// get a user by userName
function findByUserName(userName) {
  return db("users")
    .where({ userName: userName })
    .first()
    .select("id", "userName");
}
// get a user by email
function findByEmail(email) {
  return db("users")
    .where({ email: email })
    .first()
    .select("id", "userName", "email");
}

// get user info (with password) by id, for internal use in the 'login' function below
function getPersonalInfo(name) {
  return db("users")
    .where({ userName: name })
    .select("id", "userName", "password");
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
  const { userName } = info;
  const user = await getPersonalInfo(userName);
  // if user is found
  if (user.length) {
    return user[0];
  } else {
    // if user not found
    return null;
  }
}

// update a user
async function updateUser(info) {
  const { id, userName, password, email, role_Id } = info;
  const name = await findByUserName(userName);
  const userEmail = await findByEmail(email);

  console.log("name: ", name);
  console.log("userEmail: ", userEmail);
  console.log("id: ", typeof id);

  // check if NEW userName already exists
  if (name) {
    // and it's not the userName of the current user
    if (name.id !== parseInt(id)) {
      return { Error: "User name already exists" };
    }
  }

  // check if NEW email already exists
  if (userEmail) {
    // but it's not the email for the current user
    if (userEmail.id !== parseInt(id)) {
      return { Error: "Email already in use" };
    }
  }
// returns user's "id" on success
  return db("users")
    .update({
      userName: userName,
      password: password,
      email: email,
      role_Id: role_Id,
    })
    .where({ id: id })
    .returning("id");
}

function deleteUser(id) {
  // returns number of rows affected on success
  return db("users").where({ id: id }).del();
}
