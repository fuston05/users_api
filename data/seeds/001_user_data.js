
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'John Doe', email: 'john@email.com', password: 'password', role: 'admin' },
        { name: 'Jane Doe', email: 'jane@email.com', password: 'password', role: 'user' },
        { name: 'Jerry Doe', email: 'jerry@email.com', password: 'password', role: 'user' },
        { name: 'Juan Doe', email: 'juan@email.com', password: 'password', role: 'user' }
      ]);
    });
};
