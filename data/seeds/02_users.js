exports.seed = function (knex) {
  // Inserts seed entries
  return knex("users").insert([
    {
      userName: "fuston05",
      password: "1234",
      email: "fuston05@yahoo.com",
      roleId: "2",
    },
    {
      userName: "fustonHM",
      password: "1234",
      email: "fuston@someEmial.com",
      roleId: "1",
    },
    {
      userName: "scott",
      password: "1234",
      email: "email@email.com",
      roleId: "1",
    },
    {
      userName: "poopy",
      password: "1234",
      email: "weirdo@email.com",
      roleId: "1",
    },
  ]);
};
