var express = require("express");
var router = express.Router();
var path = require("path");

// Display the Mad Lib page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "madlibs.html"));
});

// Receive the words and return them
router.post("/", function (req, res) {
  res.json({
    clothes: req.body.clothes,
    fPerson1: req.body.fPerson1,
    fPerson2: req.body.fPerson2,
    mPerson1: req.body.mPerson1,
    mPerson2: req.body.mPerson2,
    plural: req.body.plural,
  });
});

module.exports = router;