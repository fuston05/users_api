// *** Shared model for all the basic CRUD ops ***

const db = require("../data/db-config");

module.exports = {
  getAllResource,
  getResourceBy,
  addResource,
  updateResource,
  deleteResource,
};

// GET all
function getAllResource(table) {
  return db(table).select("*");
}

// GET by
function getResourceBy(filter, table) {
  return db(table).where(filter).first();
}

// Add
function addResource(reqBody, table) {
  return db(table).insert(reqBody, ["*"]);
}

// Update
function updateResource(reqBody, table) {
  return db(table).update(reqBody, ["*"]).where({ id: reqBody.id });
}

// Delete
function deleteResource(id, table) {
  return db(table).where({ id }).del();
}
