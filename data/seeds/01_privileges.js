exports.seed = function (knex) {
  // Inserts seed entries
  return knex("privileges").insert([{ privilege: "User" }, { privilege: "Admin" }]);
};
