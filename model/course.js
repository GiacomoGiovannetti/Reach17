const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  typeID: {
    type: Schema.Types.ObjectId,
    ref: "CourseType",
    required: true,
  },
  universityID: [
    {
      type: Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
