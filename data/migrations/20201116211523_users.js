exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      // sets an auto-incrementing 'id' filed as primary key
      tbl.increments();
      tbl.string("roleName", 128).notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password").notNullable();
      tbl.string("email"), 128;
      // sets a foreign key to the 'role' table
      tbl
        .integer("role_Id")
        .unsigned()
        .notNullable()
        .index()
        .references("id")
        .inTable("roles");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
