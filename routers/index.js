// routers index
// exports all routers

const userRouter = require("./userRouter");
const authRouter = require("./auth/authRouter");
const privilegeRouter = require("./privilegeRouter");

module.exports = {
  userRouter,
  authRouter,
  privilegeRouter,
};
