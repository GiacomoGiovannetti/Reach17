const app = require('./app');
const { dbConnection, db } = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

port = process.env.PORT || 3000;

dbConnection();

db.once('connected', () => {
  app.listen(port, (req, res) => {
    console.log(`Server is listening at ${port}`);
  });
});
