exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("userId");
    table.string("userName", 128).notNullable().index();
    table.string("password").notNullable();
    table.string("email");
    table.string("role").defaultTo("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
