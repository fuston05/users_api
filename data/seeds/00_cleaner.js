const cleaner = require("knex-cleaner");

const options = {
  mode: "truncate", // 'delete' or 'truncate'
  restartIdentity: true, // tells postgreSQL to restart id counter
  ignoreTables: ["knex_migrations", "knex_migreations_lock"],
};

exports.seed = function (knex) {
  cleaner.clean(knex, options);
  return;
};
