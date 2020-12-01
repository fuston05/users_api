exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("roleName");
    })
    .createTable("users", (tbl) => {
      tbl.increments("userId");
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password").notNullable();
      tbl.string("email");
      tbl
        .integer("roleId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
