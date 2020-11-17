
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userName: 'fuston05', passwordHash: '1234'},
        {userName: 'fustonHM', passwordHash: '1234'},
        {userName: 'scott', passwordHash: '1234'},
        {userName: 'poopy', passwordHash: '1234'},
      ]);
    });
};
