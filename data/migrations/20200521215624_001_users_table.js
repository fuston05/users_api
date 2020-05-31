
exports.up = function(knex) {
  return knex.schema
    .createTable('user', tbl => {

      tbl.increments('user_id')

      tbl.string('name')
        .notNullable()
        .index()

      tbl.string('email')
        .notNullable()
        .unique()

      tbl.string('password')
        .notNullable()

      tbl.string('role')
        .defaultTo('user')

    });//end create users table
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
