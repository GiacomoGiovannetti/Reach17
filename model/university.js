const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // course: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Course",
  // },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
