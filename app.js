const express = require("express");
const startServer = require("./config/db");
const courseTypeRouter = require("./routes/coursetype");
const universitiesRouter = require("./routes/universities");
const courseRouter = require("./routes/course");

const app = express();

app.use(express.json());

app.use("/api/coursetype", courseTypeRouter);
app.use("/api/universities", universitiesRouter);
app.use("/api/course", courseRouter);

startServer(app);

module.exports = app;
