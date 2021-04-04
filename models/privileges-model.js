// privileges model

const db = require("../data/db-config");

module.exports = {
  find
};

function find() {
  return db("users").from("privileges").select("*");
}
