
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "username_1", first_name: 'Jim', last_name: "Doe", email: "user_1@email.com", phone: "111-111-1111", address: "201 nowhere st, someTown, IN. 45555", password: "$2a$08$rVG6yhAZskC2qkSeaDD9iO3ghJRzfFmvfGyQLMzqvxStb7qmbOXcK", role: "user"
        },

        {
          username: "username_2", first_name: 'Jane', last_name: "Doe", email: "user_2@email.com", phone: "222-222-2222", address: "202 nowhere st, someTown, IN. 45555", password: "$2a$08$rVG6yhAZskC2qkSeaDD9iO3ghJRzfFmvfGyQLMzqvxStb7qmbOXch", role: "hr"
        },

        {
          username: "username_3", first_name: 'John', last_name: "Doe", email: "user_3@email.com", phone: "333-333-3333", address: "203 nowhere st, someTown, IN. 45555", password: "$2a$08$rVG6yhAZskC2qkSeaDD9iO3ghJRzfFmvfGyQLMzqvxStb7qmbOXct", role: "admin"
        }

      ]);
    });
};
