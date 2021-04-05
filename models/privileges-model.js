// privileges model

const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findByName,
  createPrivilege,
  updatePrivilege,
  deletePrivilege,
};

// GET All Privileges
function find() {
  return db("privileges").select("*");
}

// GET Privilege By ID
function findById(id) {
  return db("privileges").select("*").where({ id }).first();
}

// GET Privilege By name
function findByName(name) {
  return db("privileges").select("*").where({ privilege: name }).first();
}

// Create a New Privilege
function createPrivilege(reqBody) {
  const { privilege, description } = reqBody;
  return db("privileges").insert(
    { privilege: privilege, description: description },
    ["*"]
  );
}

// Update an Existing Privilege
function updatePrivilege(reqBody) {
  const { id, privilege, description } = reqBody;
  return db("privileges")
    .update({ privilege: privilege, description: description }, ["*"])
    .where({ id });
}

// DELETE a privilege by ID
function deletePrivilege(id) {
  return db("privileges").where({ id }).del();
}
