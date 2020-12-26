exports.seed = function (knex) {
  // Inserts seed entries
  return knex("privileges").insert([
    {
      privilegeName: "User",
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    {
      privilegeName: "Admin",
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    {
      privilegeName: "Owner",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  ]);
};
