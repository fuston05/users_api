
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {

    tbl.increments('user_id')

    tbl.string('username')
      .unique()
      .index()
      .notNullable()

    tbl.string('first_name')
      .index()
      .notNullable()

    tbl.string('last_name')
      .index()
      .notNullable()

    tbl.string('email')
      .unique()
      .notNullable()

    tbl.string('phone')
      .defaultTo('Not provided')

    tbl.string('address')
      .defaultTo('Not provided')
      .notNullable()

    tbl.string('password')
      .notNullable()

    tbl.string('role')
      .defaultTo('user');

  });//end users
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users');
};
