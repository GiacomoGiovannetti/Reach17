const express = require("express");
const startServer = require("./config/db");

const app = express();
const port = 5000;

startServer(app, port);

module.exports = app;
