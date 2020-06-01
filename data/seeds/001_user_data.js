
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { name: 'John Doe', 
          email: 'john@email.com', 
          password: '$2a$10$B5kMzTomhu5LZqqFKilRFerWVx.ge2N/n.IRlE1suhvA5ua/mao0K', 
          role: 'admin' },

        { name: 'Jane Doe', 
          email: 'jane@email.com', 
          password: '$2a$10$B5kMzTomhu5LZqqFKilRFerWVx.ge2N/n.IRlE1suhvA5ua/mao0K', 
          role: 'user' },

        { name: 'Jerry Doe',
           email: 'jerry@email.com', 
           password: '$2a$10$B5kMzTomhu5LZqqFKilRFerWVx.ge2N/n.IRlE1suhvA5ua/mao0K', 
           role: 'user' },
           
        { name: 'Juan Doe', 
          email: 'juan@email.com', 
          password: '$2a$10$B5kMzTomhu5LZqqFKilRFerWVx.ge2N/n.IRlE1suhvA5ua/mao0K', 
          role: 'user' }
      ]);
    });
};
