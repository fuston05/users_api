exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      // sets an auto-incrementing 'id' filed as primary key
      tbl.increments();
      tbl.string("roleName", 128).notNullable();
    })

    .createTable("employment_info", (tbl) => {
      tbl.increments();
      tbl.string("job_title", 128).notNullable().index();
      tbl.string("department", 128).notNullable();
      tbl.date("hire_date", 128).notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 128);
      tbl.integer("salary").notNullable();
      // sets a foreign key to the 'role' table
      tbl
        .integer("role_id", 128)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles");
      // sets a foreign key to the 'cars' table
      tbl
        .integer("employment_info_id", 128)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("employment_info");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("employment_info")
    .dropTableIfExists("roles");
};
