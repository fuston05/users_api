exports.seed = function (knex) {
  // Inserts seed entries
  return knex("users").insert([
    {
      userName: "fuston05",
      password: "1234",
      email: "fuston05@yahoo.com",
      role_id: 2,
      car_id: 25
    },
    {
      userName: "fustonHM",
      password: "1234",
      email: "fuston@someEmial.com",
      role_id: 1,
      car_id: 1
    },
    {
      userName: "scott",
      password: "1234",
      email: "email@email.com",
      role_id: 1,
      car_id: 100
    },
    {
      userName: "poopy",
      password: "1234",
      email: "weirdo@email.com",
      role_id: 1,
      car_id: 75
    }
  ]);
};
