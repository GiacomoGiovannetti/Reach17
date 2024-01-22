const express = require("express");
const router = express.Router();
const Course = require("../model/course");
const {
  createCourse,
  modifyCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  getCoursePerUniversity,
  getCoursePerType,
  getAllCoursePerTypeAndUniversity,
} = require("../controller/course");

router.post("/", createCourse);

router.patch("/:id", modifyCourse);

router.delete("/:id", deleteCourse);

router.get("/", getAllCourse);

router.get("/:id", getCourse);

router.get("perUniversity/:universityId", getCoursePerUniversity);

router.get("/perType/:typeId", getCoursePerType);

router.get(
  "/perTypeAndUniversity/:typeId/:universityId",
  getAllCoursePerTypeAndUniversity
);

module.exports = router;
