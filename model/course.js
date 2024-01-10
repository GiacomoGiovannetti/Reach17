const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  university: {
    type: [String], // [{ type: String }]
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
