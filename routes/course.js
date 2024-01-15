const express = require("express");
const router = express.Router();
const Course = require("../model/course");

router.post("/add", (req, res) => {
  //con async await controlla controla se esiste tipologia/ateneo con findbyId se non esistono ritorna errore
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

router.patch("/modify/:id", (req, res) => {
  const { id } = req.params;
  Course.findByIdAndUpdate(id, {
    $set: {
      name: req.body.name,
      typeID: req.body.typeID,
      universityID: req.body.universityID,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "the course has been modified",
        modifiedCourse: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        message: "course has been deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/all", (req, res) => {
  Course.find()
    .select("_id name typeID universityID")
    .populate("typeID", "_id name")
    .populate("universityID", "_id name")
    .then((result) => {
      const response = {
        count: result.length,
        course: result,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Course.findById(id)
    .select("_id name typeID universityID")
    .populate("typeID", "_id name ")
    .populate("universityID", "_id name")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "No valid resource found for specified id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//filter that returns all the courses of a specified university
router.get("/all/perUniversity/:universityId", (req, res) => {
  const { universityId } = req.params;
  Course.find({ universityID: { $in: universityId } })
    .select("_id name typeID")
    .populate("typeID", "_id name")
    .then((result) => {
      const response = {
        count: result.length,
        course: result,
      };
      if (result) {
        res.status(200).json(response);
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

// filter that returns all the course of the same type that take place in the same university
router.get("/all/perTypeAndUniversity/:typeId/:universityId", (req, res) => {
  const { typeId, universityId } = req.params;
  Course.find({ typeID: typeId, universityID: { $in: universityId } })
    .select("_id name")
    .then((result) => {
      const response = {
        count: result.length,
        course: result,
      };
      if (result) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "No valid resource found for specified ids" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
