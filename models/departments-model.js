// Departments Model

const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findByName,
  createDept,
  updateDept,
  deleteDept,
};

function find() {
  return db("departments").select("*");
}

function findById(id) {
  return db("departments").where({ id }).first();
}

function findByName(department) {
  return db("departments").where({ department }).first();
}

function createDept(reqBody) {
  const { department, description } = reqBody;

  return db("departments").insert(
    { department: department, description: description },
    ["*"]
  );
}

function updateDept(reqBody) {
  const { id, department, description } = reqBody;

  return db("departments")
    .update({ department: department, description: description }, ["*"])
    .where({ id });
}

function deleteDept(id) {
  return db("departments").where({ id }).del();
}
