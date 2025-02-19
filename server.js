const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./resources/projects/projectRouter");
const actionsRouter = require("./resources/actions/actionRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("*", (req, res) => {
  res.status(200).json("API running");
});

module.exports = server;
