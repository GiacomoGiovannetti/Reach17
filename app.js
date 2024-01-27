const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const courseTypeRouter = require("./routes/coursetype");
const universitiesRouter = require("./routes/university");
const courseRouter = require("./routes/course");

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request logger
app.use(morgan("dev"));

//security http headers
app.use(helmet());

//sanitize queries
app.use(mongoSanitize());

//routes
app.use("/api/coursetype", courseTypeRouter);
app.use("/api/university", universitiesRouter);
app.use("/api/course", courseRouter);

module.exports = app;
