// users-model, shared by userRouter, and authRouter
const db = require("./db-config");

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
  return db("users")
    .join("roles", "users.role_id", "=", "roles.id")
    .select(
      "users.id",
      "users.userName",
      "users.email",
      "roles.roleName",
      "users.salary"
    );
}

// get a user by id
function findById(id) {
  return db("users")
    .join("roles", "users.role_id", "=", "roles.id")
    .where({ "users.id": id })
    .first()
    .select(
      "users.id",
      "users.userName",
      "users.email",
      "roles.roleName",
      "users.salary"
    );
}
// get a user by userName
// just for internal use/helper at the moment
function findByUserName(userName) {
  return db("users")
    .where({ userName: userName })
    .first()
    .select("id", "userName");
}
// get a user by email
// just for internal use/helper at the moment
function findByEmail(email) {
  return db("users")
    .where({ email: email })
    .first()
    .select("id", "userName", "email");
}

// get user info (with password) by id, for internal use in the 'login' function below
// not exported
function getPersonalInfo(name) {
  return db("users")
    .where({ userName: name })
    .select("id", "userName", "password", "role_id");
}

// add a new user
async function register(user) {
  const {
    userName,
    password,
    email,
    salary,
    role_id,
    employment_info_id,
  } = user;
  // check if username or email already exists
  const userExists = await findByUserName(userName);
  const emailExists = await findByEmail(email);

  if (userExists) {
    return { Error: "User already exists" };
  }
  // check email is not already taken
  if (emailExists) {
    return { Error: "Email is already in use" };
  }

  // return 'id' on success,
  return db
    .insert({
      userName: userName,
      password: password,
      email: email,
      salary: salary,
      role_id: role_id,
      employment_info_id: employment_info_id,
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
  const { id, userName, email, salary, role_id } = info;
  const name = await findByUserName(userName);
  const userEmail = await findByEmail(email);

  // check if NEW userName already exists
  if (name) {
    // and it's not the userName of the current user
    if (name.id !== parseInt(id)) {
      return { Error: "User name already exists" };
    }
  } else {
    return { Error: "That User does not exist" };
  }

  // check if NEW email already exists
  if (userEmail) {
    // but it's not the email for the current user
    if (userEmail.id !== parseInt(id)) {
      return { Error: "Email already in use" };
    } else {
      return { Error: "That user does not exist" };
    }
  }
  // returns user's "id" on success
  return db("users")
    .update({
      userName: userName,
      email: email,
      salary: salary,
      role_id: role_id,
    })
    .where({ id: id })
    .returning("id");
}

async function deleteUser(id) {
  // check if user exists first
  const userCheck = await findById(id);

  if (userCheck) {
    // returns number of rows affected on success
    return db("users").where({ id: id }).del();
  } else {
    return { Error: "That user does not exist." };
  }
}
