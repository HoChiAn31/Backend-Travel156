const express = require("express");
const router = express.Router();
const Review = require("../controllers/review");

router.get("/", Review.getAllReviews);
router.get("/post/:postId", Review.getReviewByPostlId);
router.get("/:id", Review.getOneReview);
router.post("/", Review.createReview);
router.put("/:id", Review.updateReview);
router.patch("/:id", Review.updateReview);
router.delete("/:id", Review.deleteReview);

module.exports = router;
