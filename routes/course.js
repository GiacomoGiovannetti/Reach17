const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  res.status(200).json({
    succes: true,
    body: req.body,
  });
});

router.put("/modify/:name", (req, res) => {
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
  res.status(200).json({
    success: true,
    message: "mostra tutti i corsi",
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
