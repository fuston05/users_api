module.exports = {
  development: {
    client: "postgres",
    connection: {
      database: "users",
      user: "Scott-MacBook",
      password: "",
    },
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
