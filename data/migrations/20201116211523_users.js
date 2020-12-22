exports.up = function (knex) {
  return knex.schema
    .createTable("privileges", (tbl) => {
      // sets an auto-incrementing 'id' filed as primary key
      tbl.increments();
      tbl.string("privilege", 128).notNullable();
    })

    .createTable("departments", (tbl) => {
      tbl.increments();
      tbl.string("department", 128).notNullable().index();
      tbl.string("manager_first_name", 128).notNullable();
      tbl.string("manager_last_name", 128).notNullable();
    })

    .createTable("job_titles", (tbl) => {
      tbl.increments();
      tbl.string("job_title", 128).notNullable().index();
      tbl.integer("starting_salary").notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 128);
      tbl.integer("current_salary").notNullable();
      tbl.date("hire_date").notNullable();
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
