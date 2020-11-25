
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {  
    table.increments('userId');
    table.string('userName').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
