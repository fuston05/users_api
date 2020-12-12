// db-config
require("dotenv").config();

const knex = require("knex");
const environment = process.env.NODE_ENV || "production";

const config = require("../knexfile")[environment];

module.exports = knex(config);
