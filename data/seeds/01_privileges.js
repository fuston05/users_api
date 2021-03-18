exports.seed = function (knex) {
  // Inserts seed entries
  return knex("privileges").insert([
    {
      privilege: "User",
      description:
        "This is the default user. This user can only 'read' data, they cannot add or create any new users to the system. They cannot view any financial information and certain other sensitive information or delete any information.",
    },
    {
      privilege: "Admin",
      description:
        "This is the Admin user. This user can view user information including sensitive information, create new users, and view/edit financial information. This user has no 'delete' rights.",
    },
    {
      privilege: "Owner",
      description:
        "This is the Admin user. This user can view user information including sensitive information, create new users, and view/edit financial information. This user also has 'delete' rights, and full data access.",
    },
  ]);
};
