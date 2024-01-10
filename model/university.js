const mongoose = require("mongoose");
const { countDocuments } = require("./courseType");
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    // POTREBBE NON SERVIRE
    type: [String],
    required: true,
  },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
