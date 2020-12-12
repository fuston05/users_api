exports.seed = function (knex) {
  // Inserts seed entries
  return knex("users").insert([
    {
      userName: "fuston05",
      password: "1234",
      email: "fuston05@yahoo.com",
      role_Id: 2,
    },
    {
      userName: "fustonHM",
      password: "1234",
      email: "fuston@someEmial.com",
      role_Id: 1,
    },
    {
      userName: "scott",
      password: "1234",
      email: "email@email.com",
      role_Id: 1,
    },
    {
      userName: "poopy",
      password: "1234",
      email: "weirdo@email.com",
      role_Id: 1,
    },
  ]);
};
