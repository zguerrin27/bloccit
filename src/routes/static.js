const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

// router.get("/", (req, res, next) => {
//   res.send("Welcome to Bloccit");
// });

router.get("/", staticController.index);

router.get("/marco", (req, res, next) => {
  res.send("polo");
});

// about
// router.get("/about", (req, res, next) => {
//   res.send("About Us");
// });

router.get("/about", staticController.about);

module.exports = router;