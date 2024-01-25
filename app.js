const express = require("express");
// const { startServer } = require("./config/db");
const courseTypeRouter = require("./routes/coursetype");
const universitiesRouter = require("./routes/university");
const courseRouter = require("./routes/course");

const app = express();

app.use(express.json());

app.use("/api/coursetype", courseTypeRouter);
app.use("/api/university", universitiesRouter);
app.use("/api/course", courseRouter);

module.exports = app;
