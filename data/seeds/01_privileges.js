exports.seed = function (knex) {
  // Inserts seed entries
  return knex("privileges").insert([
    {
      privilegeName: "User",
      create: false,
      read: true,
      update: false,
      delete: false,
      financial: false,
    },
    {
      privilegeName: "Admin",
      create: true,
      read: true,
      update: true,
      delete: false,
      financial: true,
    },
    {
      privilegeName: "Owner",
      create: true,
      read: true,
      update: true,
      delete: true,
      financial: true,
    },
  ]);
};
