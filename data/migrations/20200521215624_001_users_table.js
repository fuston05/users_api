
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {

      tbl.increments('user_id')

      tbl.string('name')
        .notNullable()
        .index()

      tbl.string('email')
        .unique()

    });//end create users table
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
