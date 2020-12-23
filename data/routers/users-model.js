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
function find(privilege_id) {
  // will only show salary information if the user is at least Admin privileges (>=2)
  if (privilege_id >= 2) {
    return db("users as u")
      .join("privileges as p", "u.privilege_id", "=", "p.id")
      .join("job_titles as j", "u.job_title_id", "=", "j.id")
      .join("departments as d", "u.department_id", "=", "d.id")
      .select(
        "u.id",
        "u.userName",
        "u.email",
        "u.hire_date",
        "j.job_title",
        "d.department",
        "j.starting_salary",
        "u.current_salary",
        "p.privilegeName"
      );
  } else {
    // if the user is NOT at least Admin(2) privileges, exclude salary info
    return db("users as u")
      .join("privileges as p", "u.privilege_id", "=", "p.id")
      .join("job_titles as j", "u.job_title_id", "=", "j.id")
      .join("departments as d", "u.department_id", "=", "d.id")
      .select(
        "u.id",
        "u.userName",
        "u.email",
        "u.hire_date",
        "j.job_title",
        "d.department",
        "p.privilegeName"
      );
  }
}

// get a user by id
function findById(id, privilege_id) {
  // will only show salary information if the user is at least Admin privileges (>=2)
  if (privilege_id >= 2) {
    return db("users as u")
      .join("privileges as p", "u.privilege_id", "=", "p.id")
      .join("job_titles as j", "u.job_title_id", "=", "j.id")
      .join("departments as d", "u.department_id", "=", "d.id")
      .where({ "u.id": id })
      .first()
      .select(
        "u.id",
        "u.userName",
        "u.email",
        "u.hire_date",
        "j.job_title",
        "d.department",
        "j.starting_salary",
        "u.current_salary",
        "p.privilegeName"
      );
  } else {
    // if the user is NOT at least Admin(2) privileges, exclude salary info
    return db("users as u")
      .join("privileges as p", "u.privilege_id", "=", "p.id")
      .join("job_titles as j", "u.job_title_id", "=", "j.id")
      .join("departments as d", "u.department_id", "=", "d.id")
      .where({ "u.id": id })
      .first()
      .select(
        "u.id",
        "u.userName",
        "u.email",
        "u.hire_date",
        "j.job_title",
        "d.department",
        "p.privilegeName"
      );
  }
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
    .select("id", "userName", "password", "privilege_id");
}

// add a new user
async function register(user) {
  const {
    userName,
    password,
    email,
    hire_date,
    current_salary,
    privilege_id,
    department_id,
    job_title_id,
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
      hire_date: hire_date,
      current_salary: current_salary,
      privilege_id: privilege_id,
      department_id: department_id,
      job_title_id: job_title_id,
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
async function updateUser(info, curUserPrivilegeId) {
  const {
    id,
    userName,
    email,
    hire_date: hire_date,
    current_salary,
    privilege_id,
    department_id,
    job_title_id,
  } = info;
  // query DB to see if username or email is already taken
  const name = await findByUserName(userName);
  const userEmail = await findByEmail(email);

  // if user does not exist
  if (!findById(id, curUserPrivilegeId)) {
    return { Error: "That user does not exist" };
  }

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
      email: email,
      hire_date: hire_date,
      current_salary: current_salary,
      privilege_id: privilege_id,
      department_id: department_id,
      job_title_id: job_title_id,
    })
    .where({ id: id })
    .returning("id");
}

async function deleteUser(id, privilege_id) {
  // check if user exists first
  const userCheck = await findById(id, privilege_id);

  if (userCheck) {
    // returns number of rows affected on success
    return db("users").where({ id: id }).del();
  } else {
    return { Error: "That user does not exist." };
  }
}
