exports.up = function (knex) {
  return knex.schema
    .createTable("privileges", (tbl) => {
      // sets an auto-incrementing 'id' filed as primary key
      tbl.increments();
      tbl.string("privilege", 128).notNullable().defaultsTo("User");
      tbl.text("description").notNullable();
    })

    .createTable("departments", (tbl) => {
      tbl.increments();
      tbl.string("department", 128).notNullable();
      tbl.string("description", 128).notNullable();
    })

    .createTable("job_titles", (tbl) => {
      tbl.increments();
      tbl.string("job_title", 128).notNullable();
      tbl.integer("starting_salary").notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("firstName", 128).notNullable();
      tbl.string("lastName", 128).notNullable();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 128);
      tbl.integer("current_salary").notNullable();
      tbl.date("hire_date").notNullable();
      tbl.string("emailToken", 128).defaultsTo(null);
      tbl.boolean("isVerified", 128).notNullable().defaultsTo(false);
      // sets a foreign key to the 'role' table
      tbl
        .integer("privilege_id", 128)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("privileges");
      // sets a foreign key to the 'departments' table
      tbl
        .integer("department_id", 128)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("departments");
      // sets a foreign key to the 'job_titles' table
      tbl
        .integer("job_title_id", 128)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("job_titles");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("job_titles")
    .dropTableIfExists("departments")
    .dropTableIfExists("privileges");
};
