const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const dbURI =
  "mongodb+srv://giovannettiigiacomo:reach17@reach17.jlfpbvi.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, (req, res) => {
      console.log(
        `il server è in ascolto a: ${port} ed è stata effettuata la connessione al db`
      );
    })
  )
  .catch((err) => console.error(err));
