// privileges model

const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findByName,
  createPrivilege,
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
