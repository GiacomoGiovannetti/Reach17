const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//declaring in a shorted way env variables
const envVars = {
  port: process.env.PORT || 3000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  dbName: process.env.DB_NAME,
};

const dbURI = `mongodb+srv://${envVars.user}:${envVars.password}@${envVars.cluster}.${envVars.dbName}/?retryWrites=true&w=majority`;

//connection to database via URI
mongoose.connect(dbURI);
let db = mongoose.connection;

//function to start the server depending on the outcome of the connection to the db
const startServer = (app) => {
  db.once("connected", () => {
    app.listen(envVars.port, (req, res) => {
      console.log(
        `Connection to db completed - Server is listening at ${envVars.port}`
      );
    });
  });

  db.on("error", (err) => {
    console.error(
      "Failed to connected to db - Server is not listening : ",
      err
    );
  });
};

module.exports = startServer;

// const startServer = async (app, port) => {
//   try {
//     const connectionResult = await db;
//     connectionResult.once("connected", (event) => {
//       app.listen(port, (req, res) => {
//         console.log(`Il server è in ascolto a ${port}`);
//       });
//     });
//     connectionResult.on("error", () => {
//       throw new Error("The server is not listening");
//     });
//   } catch (err) {
//     console.error("Error message : ", err);
//   }
// };
