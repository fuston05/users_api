// routers index
// exports all routers

const userRouter = require("./userRouter");
const authRouter = require("./auth/authRouter");

module.exports = {
  userRouter,
  authRouter,
};
