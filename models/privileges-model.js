// privileges model

const db = require("../data/db-config");

module.exports = {
  getPrivileges,
  getPrivilegeById,
  createPrivilege,
  deletePrivilege,
  updatePrivilege,
};

function getPrivileges() {
  return db("users").from("privileges").select("*");
}
