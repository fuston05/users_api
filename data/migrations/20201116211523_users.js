exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      // sets an auto-incrementing 'id' filed as primary key
      tbl.increments();
      tbl.string("roleName", 128).notNullable();
    })

    .createTable("cars", (tbl) => {
      tbl.increments();
      tbl.string("carMake", 128).notNullable().index();
      tbl.string("carModel", 128).notNullable();
      tbl.string("carYear", 64).notNullable();
    })

    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("userName", 128).notNullable().index().unique();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 128);
      // sets a foreign key to the 'role' table
      tbl
        .integer("role_id", 64)
        .unsigned()
        .notNullable()
        .index()
        .references("id")
        .inTable("roles");
      // sets a foreign key to the 'cars' table
      tbl
        .integer("car_id", 64)
        .unsigned()
        .index()
        .references("id")
        .inTable("cars");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("cars")
    .dropTableIfExists("roles");
};
