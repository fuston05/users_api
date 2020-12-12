exports.seed = function (knex) {
  // Inserts seed entries
  return knex("role").insert([{ roleName: "User" }, { roleName: "Admin" }]);
};
