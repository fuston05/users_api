// db-config
const knex = require("knex");
const environment = process.env.ENVIRONMENT;

const config = require("../knexfile")[environment];

module.exports = knex(config);
