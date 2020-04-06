module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost', // server name or IP address;
      port: 5432,
      database: 'Scott-MacBook',
      user: 'Scott-MacBook',
      password: '1234'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
      }
    
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './__test__/test_database/test_db.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './__test__/test_database/migrations'
    },
    seeds: {
      directory: './__test__/test_database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'localhost', // server name or IP address;
      port: 5432,
      database: 'Scott-MacBook',
      user: 'Scott-MacBook',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  }
};
