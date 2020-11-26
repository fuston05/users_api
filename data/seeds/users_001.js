exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          userName: "fuston05",
          password: "1234",
          email: "fuston05@yahoo.com",
          role: "admin",
        },
        {
          userName: "fustonHM",
          password: "1234",
          email: "fuston@someEmial.com",
        },
        { userName: "scott", password: "1234", email: "email@email.com" },
        { userName: "poopy", password: "1234", email: "weirdo@email.com" },
      ]);
    });
};
