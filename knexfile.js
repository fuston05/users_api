// Update with your config settings.

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

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
