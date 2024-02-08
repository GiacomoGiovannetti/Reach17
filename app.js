const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const courseTypeRouter = require('./routes/courseType');
const universitiesRouter = require('./routes/university');
const courseRouter = require('./routes/course');

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request logger
app.use(morgan('dev'));

//security http headers
app.use(helmet());

//sanitize queries
app.use(mongoSanitize());

//routes
app.use('/api/courseTypes', courseTypeRouter);
app.use('/api/universities', universitiesRouter);
app.use('/api/courses', courseRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Reach17 ' });
});

module.exports = app;
