const express = require("express");
const router = express.Router();
const University = require("../model/university");

router.post("/add", (req, res) => {
  const university = new University({
    name: req.body.name,
  });

  university
    .save()
    .then((result) => {
      res.status(201).json({
        message: "University created successfully",
        createdUniversity: {
          _id: result.id,
          name: result.name,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch("/modify/:id", (req, res) => {
  const { id } = req.params;
  University.findByIdAndUpdate(id, { $set: { name: req.body.name } }).then(
    (result) => {
      res.status(200).json({
        message: "University has been modified",
        modifiedUniversity: result,
      });
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  University.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ message: "University has been deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/all", (req, res) => {
  University.find()
    .select("_id name")
    .then((result) => {
      const response = {
        count: result.length,
        universities: result,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  University.findById(id)
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
      res.status(500).json({ error: err });
    });
});

module.exports = router;
