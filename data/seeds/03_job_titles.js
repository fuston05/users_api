exports.seed = function (knex) {
  // Inserts seed entries
  return knex("job_titles").insert([
    {
      job_title: "Account Coordinator",
      starting_salary: 105090,
    },
    {
      job_title: "Environmental Tech",
      starting_salary: 155575,
    },
    {
      job_title: "Account Executive",
      starting_salary: 121412,
    },
    {
      job_title: "Administrative Officer",
      starting_salary: 151959,
    },
    {
      job_title: "Tax Accountant",
      starting_salary: 115011,
    },
    {
      job_title: "Editor",
      starting_salary: 118562,
    },
    {
      job_title: "Geologist I",
      starting_salary: 169479,
    },
    {
      job_title: "Quality Engineer",
      starting_salary: 149441,
    },
    {
      job_title: "VP Quality Control",
      starting_salary: 138089,
    },
    {
      job_title: "Front-End Developer",
      starting_salary: 112808,
    },
    {
      job_title: "Senior Financial Analyst",
      starting_salary: 60193,
    },
    {
      job_title: "Marketing Manager",
      starting_salary: 120686,
    },
    {
      job_title: "Human Resources Manager",
      starting_salary: 123527,
    },
    {
      job_title: "Librarian",
      starting_salary: 163617,
    },
    {
      job_title: "Programmer II",
      starting_salary: 162746,
    },
    {
      job_title: "Structural Analysis Engineer",
      starting_salary: 61234,
    },
    {
      job_title: "Paralegal",
      starting_salary: 65807,
    },
    {
      job_title: "Technical Writer",
      starting_salary: 136953,
    },
    {
      job_title: "Research Assistant II",
      starting_salary: 130903,
    },
    {
      job_title: "Javascript Developer",
      starting_salary: 141532,
    },
    {
      job_title: "Environmental Specialist",
      starting_salary: 60260,
    },
    {
      job_title: "Junior Executive",
      starting_salary: 150978,
    },
    {
      job_title: "Marketing Assistant",
      starting_salary: 81215,
    },
    {
      job_title: "Director of Sales",
      starting_salary: 61782,
    },
    {
      job_title: "Physical Therapy Assistant",
      starting_salary: 124979,
    },
  ]);
};
