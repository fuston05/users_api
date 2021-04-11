// *** Models index, Exports all models ***

const users = require("./users-model");
const privileges = require("./privileges-model");
const departments = require("./departments-model");
const common = require("./common-model");

module.exports = {
  users,
  privileges,
  departments,
  common,
};
