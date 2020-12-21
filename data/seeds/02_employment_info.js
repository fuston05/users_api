exports.seed = function (knex) {
  // Inserts seed entries
  return knex("employment_info").insert([
    {
      job_title: "VP Quality Control",
      department: "Engineering",
      hire_date: "2014-07-24",
    },
    {
      job_title: "Account Representative II",
      department: "Training",
      hire_date: "2018-03-28",
    },
    {
      job_title: "Engineer I",
      department: "Engineering",
      hire_date: "2019-09-06",
    },
    {
      job_title: "Web Developer IV",
      department: "Business Development",
      hire_date: "2019-02-01",
    },
    {
      job_title: "Assistant Media Planner",
      department: "Accounting",
      hire_date: "2009-09-03",
    },
    {
      job_title: "Actuary",
      department: "Accounting",
      hire_date: "2010-06-30",
    },
    {
      job_title: "Senior Financial Analyst",
      department: "Research and Development",
      hire_date: "2019-06-18",
    },
    {
      job_title: "Analog Circuit Design manager",
      department: "Product Management",
      hire_date: "2010-10-10",
    },
    {
      job_title: "Editor",
      department: "Sales",
      hire_date: "2019-01-11",
    },
    {
      job_title: "Statistician III",
      department: "Human Resources",
      hire_date: "2015-04-16",
    },
  ]);
};
