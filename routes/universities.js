const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ecco tutte le università",
  });
});

router.post("/add", (req, res) => {
  res.status(200).json({
    success: true,
    body: req.body,
  });
});

router.put("/modify/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    success: true,
    name: name,
    body: req.body,
  });
});

router.delete("/delete/:name", (req, res) => {
  const { name } = req.params;
  res.status(200).json({
    success: true,
    name: name,
  });
});

module.exports = router;
