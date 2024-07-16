const express = require("express");
const router = express.Router();
const userTour = require("../controllers/usertour");

// POST /api/users/:userId/locations
router.post("/locations/:userId", userTour.createUserTour);

// GET /api/users/:userId/recommendations
router.get("/recommendations/:userId", userTour.getUserRecommendationTours);

module.exports = router;
