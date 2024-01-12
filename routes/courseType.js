const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CourseType = require("../model/courseType");

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
  //   res
  //     .status(200)
  //     .json({ success: true, message: "tutte le tipologie di corsi" });
});

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
  CourseType.updateOne({ _id: id }, { $set: { name: req.body.newName } })
    .then((result) => res.send(result).status(200))
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  CourseType.remove({ _id: id })
    .then(res.status(200).json({ success: true }))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  CourseType.find({ _id: id })
    .select("_id name")
    .then((result) => {
      if (result) {
        res.send(response).status(200);
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
