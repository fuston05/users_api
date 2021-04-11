// models index
// exports all models

const users = require("./users-model");
const privileges = require("./privileges-model");
const departments = require("./departments-model");

module.exports = {
  users,
  privileges,
  departments,
};
