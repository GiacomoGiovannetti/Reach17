const express = require("express");
const router = express.Router();
const Course = require("../model/course");

router.post("/add", (req, res) => {
  const course = new Course({
    name: req.body.name,
    typeID: req.body.typeID,
    universityID: req.body.universityID,
  });
  course
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Item has been created successfully",
        createdCourse: {
          _id: result.id,
          name: result.name,
          typeID: result.typeID,
          universityId: result.universityID,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch("/modify/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    success: true,
    body: req.body,
    name: name,
  });
});

router.delete("/delete/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    success: true,
    name: name,
  });
});

router.get("/all", (req, res) => {
  Course.find()
    //.select("_id name typeID universityID")
    .then((result) => {
      const response = {
        count: result.length,
        course: result,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/all/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    name: name,
    success: true,
    message: "ecco tutti i corsi che corrispondono a nome",
  });
});

router.get("/all/perUniversity/:university", (req, res) => {
  const { university } = req.params;
  res.status(200).json({
    success: true,
    university: university,
    message: "ecco tutti i corsi di università",
  });
});

router.get("/all/perTypeAndUniversity/:type/:university", (req, res) => {
  const { type, university } = req.params;
  res.status(200).json({
    success: true,
    type: type,
    university: university,
    message: "tutti i corsi di tipo che si svolgono in università",
  });
});

module.exports = router;
