const cleaner = require("knex-cleaner");

const options = {
  mode: "truncate", // 'delete' or 'truncate'
  restartIdentity: true, // tells postgreSQL to restart id counter
  ignoreTables: ["knex_migrations", "knex_migrations_lock"],
};

exports.seed = function (knex) {
  return cleaner.clean(knex, options);
};
