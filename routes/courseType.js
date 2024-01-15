const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CourseType = require("../model/courseType");

router.post("/add", (req, res) => {
  const courseType = new CourseType({
    name: req.body.name,
  });

  courseType
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Course type created successfully",
        createdCourseType: {
          _id: result.id,
          name: result.name,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  //res.status(200).json({ success: true, body: req.body });
});

router.patch("/modify/:id", (req, res) => {
  const { id } = req.params;
  CourseType.findByIdAndUpdate(id, { $set: { name: req.body.name } })
    .then((result) =>
      res.status(200).json({
        message: "courseType has been modified",
        modifiedCourseType: result,
      })
    )
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  CourseType.findByIdAndDelete(id)
    .then(
      res
        .status(200)
        .json({ message: "course type has been deleted successfully" })
    )
    .catch((err) => {
      console.log(err);
    });
});

router.get("/all", (req, res) => {
  CourseType.find()
    .select("_id name")
    .then((result) => {
      const response = {
        count: result.length,
        courseTypes: result,
      };
      res.json(response).status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  CourseType.findById(id)
    .select("_id name")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "No valid resource found for specified id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
