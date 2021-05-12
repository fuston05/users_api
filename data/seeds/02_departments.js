exports.seed = function (knex) {
  // Inserts seed entries
  return knex("departments").insert([
    {
      department: "Product Management",
      description: "Manages products at all levels",
    },
    {
      department: "Business Development",
      description: "Business Development department description goes here.",
    },
    {
      department: "Accounting",
      description: "Accounting department description goes here.",
    },
    {
      department: "Production",
      description: "Production department description goes here.",
    },
    {
      department: "Services",
      description: "Services department description goes here.",
    },
    {
      department: "Sales",
      description: "Sales department description goes here.",
    },
    {
      department: "Support",
      description: "Support department description goes here.",
    },
    {
      department: "Research and Development",
      description: "Research and Development department description goes here.",
    },
    {
      department: "Training",
      description: "Training department description goes here.",
    },
  ]);
};
