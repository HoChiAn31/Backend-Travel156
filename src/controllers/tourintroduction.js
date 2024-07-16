const models = require("../models/index");
const TourIntroduction = models.TourIntroduction;
const tourIntroductionController = {
  async createTourIntroduction(req, res) {
    try {
      const newTourIntroduction = await TourIntroduction.create(req.body);
      res.status(201).json(newTourIntroduction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllTourIntroductions(req, res) {
    try {
      const tourIntroductions = await TourIntroduction.findAll();
      res.status(200).json(tourIntroductions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneTourIntroduction(req, res) {
    try {
      const tourIntroductions = await TourIntroduction.findByPk(req.params.id);
      res.status(200).json(tourIntroductions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateTourIntroduction(req, res) {
    try {
      const updatedTourIntroduction = await TourIntroduction.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedTourIntroduction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteTourIntroduction(req, res) {
    try {
      const deletedTourIntroduction = await TourIntroduction.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedTourIntroduction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = tourIntroductionController;
