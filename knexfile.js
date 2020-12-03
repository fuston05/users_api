// Update with your config settings.
const port = process.env.PORT;

module.exports = {
  development: {
    client: "sqlite3",
    // sqlite thing
    useNullAsDefault: true,
    connection: {
      filename: "./data/users.db",
      tablename: "knex_migrations",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after connection is made to sqlite engine
        conn.run("PRAGMA foreign_key= ON", done); //turns on foreign key enforcement
      },
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
