const express = require("express");
const advertController = require("../controllers/advertController");
const router = express.Router();

router.get("/adverts", advertController.index);
router.get("/adverts/new", advertController.new);
router.post("/adverts/create", advertController.create);
router.get("/adverts/:id", advertController.show);
router.post("/adverts/:id/destroy", advertController.destroy);
router.get("/adverts/:id/edit", advertController.edit);
router.post("/adverts/:id/update", advertController.update);

module.exports = router;