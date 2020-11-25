exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { userName: "fuston05", password: "1234" },
        { userName: "fustonHM", password: "1234" },
        { userName: "scott", password: "1234" },
        { userName: "poopy", password: "1234" },
      ]);
    });
};
