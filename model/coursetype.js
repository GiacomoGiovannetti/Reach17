const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const CourseType = mongoose.model("CourseType", courseTypeSchema);

module.exports = CourseType;
