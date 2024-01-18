const express = require("express");
const router = express.Router();
const University = require("../model/university");
const {
  createUniversity,
  modifyUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversity,
} = require("../controller/university");

router.post("/", createUniversity);

router.patch("/:id", modifyUniversity);

router.delete("/:id", deleteUniversity);

router.get("/", getAllUniversities);

router.get("/:id", getUniversity);

module.exports = router;
