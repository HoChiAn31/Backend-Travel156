const express = require("express");
const router = express.Router();
const TourBookings = require("../controllers/tourBooking");

router.get("/", TourBookings.getAllTourBookings);
router.get("/:id", TourBookings.getOneTourBookings);
router.post("/", TourBookings.createTourBookings);
router.put("/:id", TourBookings.updateTourBookings);
router.patch("/:id", TourBookings.updateTourBookings);
router.delete("/:id", TourBookings.deleteTourBookings);
module.exports = router;
