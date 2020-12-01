#### Node API Practice

- this is just extra practice for RESTful API's using nodeJs, ExpressJs, KnexJs, PostgreSQL Database
- uses knex cleaner library to delete seeds before re-seeding:
  [knex cleaner](https://www.npmjs.com/package/knex-cleaner)

## knex Seeds & Migrations

- migrations must be in the correct order due to the one-to-many relationship using foreign keys. Reverse the order for the migrations 'down' function. This same order applies to the seeds as well.
