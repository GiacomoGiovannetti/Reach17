const express = require("express");
const router = express.Router();
const {
  createCourseType,
  modifyCourseType,
  deleteCourseType,
  getAllCourseType,
  getCourseType,
} = require("../controller/courseType");

router.post("/", createCourseType);

router.patch("/:id", modifyCourseType);

router.delete("/:id", deleteCourseType);

router.get("/", getAllCourseType);

router.get("/:id", getCourseType);

module.exports = router;
