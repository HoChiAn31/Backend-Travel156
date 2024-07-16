const models = require("../models/index");
const Review = models.Review;
const reviewController = {
  async createReview(req, res) {
    try {
      const newReview = await Review.create(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllReviews(req, res) {
    try {
      const reviews = await Review.findAll();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneReview(req, res) {
    try {
      const reviews = await Review.findByPk(req.params.id);
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getReviewByPostlId(req, res) {
    try {
      const reviews = await Review.findAll({
        where: { postId: req.params.postId },
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateReview(req, res) {
    try {
      const updatedReview = await Review.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteReview(req, res) {
    try {
      const deletedReview = await Review.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = reviewController;
