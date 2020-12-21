// server.js
const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// define routers
const userRouter = require("../data/users/userRouter");
const authRouter = require("../data/auth/authRouter");

// use routers
server.use("/users", userRouter);
server.use("/users/auth", authRouter);

server.get("/", (req, res) => {
  res.send("**** Welcome, the Server is live! ****");
});

// fall back case
server.use("/", (req, res) => {
  res.status(404).json({ Error: "Did not recognize that url" });
});

module.exports = server;
