exports.seed = function (knex) {
  // Inserts seed entries
  return knex("departments").insert([
    {
      department: "Product Management",
      manager_first_name: "Annmarie",
      manager_last_name: "Lenaghen",
    },
    {
      department: "Business Development",
      manager_first_name: "Thorndike",
      manager_last_name: "Twells",
    },
    {
      department: "Accounting",
      manager_first_name: "Agustin",
      manager_last_name: "Flipsen",
    },
    {
      department: "Production",
      manager_first_name: "Hedvige",
      manager_last_name: "Vasenkov",
    },
    {
      department: "Services",
      manager_first_name: "Jolyn",
      manager_last_name: "Adney",
    },
    {
      department: "Sales",
      manager_first_name: "Aloise",
      manager_last_name: "MacInherney",
    },
    {
      department: "Support",
      manager_first_name: "Joyan",
      manager_last_name: "Ambrosoni",
    },
    {
      department: "Research and Development",
      manager_first_name: "Olly",
      manager_last_name: "Sproul",
    },
    {
      department: "Training",
      manager_first_name: "Augustus",
      manager_last_name: "Daviot",
    },
  ]);
};
