// *** Routers index, exports all routers ***

const userRouter = require("./userRouter");
const authRouter = require("./auth/authRouter");
const privilegeRouter = require("./privilegeRouter");
const departmentsRouter = require("./departmentsRouter");

module.exports = {
  userRouter,
  authRouter,
  privilegeRouter,
  departmentsRouter,
};
