// *** Departments Model ***

const db = require("../data/db-config");

// module.exports = {
//   find,
//   findById,
//   findByName,
//   createDept,
//   updateDept,
//   deleteDept,
// };

// // GET all departments
// function find() {
//   return db("departments").select("*");
// }

// // GET a department by ID
// function findById(id) {
//   return db("departments").where({ id }).first();
// }

// // GET a department by department name
// function findByName(department) {
//   return db("departments").where({ department }).first();
// }

// // Create a new department
// function createDept(reqBody) {
//   const { department, description } = reqBody;

//   return db("departments").insert(
//     { department: department, description: description },
//     ["*"]
//   );
// }

// // Update an existing department
// function updateDept(reqBody) {
//   const { id, department, description } = reqBody;

//   return db("departments")
//     .update({ department: department, description: description }, ["*"])
//     .where({ id });
// }

// // Delete an existing department
// function deleteDept(id) {
//   return db("departments").where({ id }).del();
// }
