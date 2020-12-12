exports.seed = function (knex) {
  // Inserts seed entries
  return knex("roles").insert([{ roleName: "User" }, { roleName: "Admin" }]);
};
