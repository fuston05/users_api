exports.up = function (knex) {
  return knex.schema
    .createTable("role", (tbl) => {
      tbl.increments();
      tbl.string("roleName", 128).notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password").notNullable();
      tbl.string("email"), 128;
      tbl
        .integer("role_Id")
        .unsigned()
        .index()
        .references("id")
        .inTable("role").onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("role");
};
