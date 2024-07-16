const express = require("express");
const router = express.Router();
const userHotel = require("../controllers/userHotel");

// POST /api/users/:userId/locations
router.post("/:userId", userHotel.createUserHotel);

// GET /api/users/:userId/recommendations
router.get("/:userId", userHotel.getUserHotelRecommendationHotels);

module.exports = router;
