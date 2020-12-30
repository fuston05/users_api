// server.js
const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");
const { assignId } = require("../middleware/morgan_tokens");
const rfs = require("rotating-file-stream");

// global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
// assignId is used in the morgan token 'id'
server.use(assignId);

// writes morgan logs to 'rotating' log file
let accessLogStream = rfs.createStream("./logs/access.log", {
  interval: "1d",
});

// logs to '/logs/access.log' file
server.use(
  morgan(
    "id: :id, method: :method, date: :date(iso), remoteAddr: :remote-addr, url: :url, status: :status, userAgent: :user-agent, resTime: :response-time \n\n",
    { stream: accessLogStream }
  )
);

// define routers
const userRouter = require("../routers/userRouter");
const authRouter = require("../routers/auth/authRouter");

// use routers
server.use("/users", userRouter);
server.use("/auth", authRouter);

server.get("/", (req, res) => {
  res.send("**** Welcome, the Server is live! ****");
});

// fall back case
server.use("/", (req, res) => {
  res.status(404).json({ Error: "Did not recognize that url" });
});

module.exports = server;
