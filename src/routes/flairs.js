const express = require("express");
const router = express.Router();
const flairController = require("../controllers/flairController");

router.get("/flairs", flairController.index);
router.get("/flairs/new", flairController.new);
router.post("/flairs/create", flairController.create);
router.get("/flairs/:id", flairController.show);

module.exports = router;