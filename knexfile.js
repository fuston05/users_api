module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/users.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys= on', done);
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './test_database/test_db.db3'
    },
    migrations: {
      directory: './test_database/migrations'
    },
    seed: {
      directory: './test_database/seeds'
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
  }

};
