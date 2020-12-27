// helper functions for models

const db = require("../data/db-config");

// checks if userName or email thats passed in is already in use
const userCredsExist = async (userCreds) => {
  const resp = await db("users").where(userCreds).first();
  if (resp && resp.id) {
    return true;
  }
  return false;
};

module.exports = {
  userCredsExist,
};
