const express = require("express");
const router = express.Router();
const TourIntroduction = require("../controllers/tourintroduction");

router.get("/", TourIntroduction.getAllTourIntroductions);
router.get("/:id", TourIntroduction.getOneTourIntroduction);
router.post("/", TourIntroduction.createTourIntroduction);
router.put("/:id", TourIntroduction.updateTourIntroduction);
router.patch("/:id", TourIntroduction.updateTourIntroduction);
router.delete("/:id", TourIntroduction.deleteTourIntroduction);

module.exports = router;
