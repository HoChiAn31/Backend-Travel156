const models = require("../models/index");
const TourBookings = models.TourBookings;
const TourBookingsController = {
  async createTourBookings(req, res) {
    try {
      const newTourBookings = await TourBookings.create(req.body);
      res.status(201).json(newTourBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllTourBookings(req, res) {
    try {
      const tourBookingss = await TourBookings.findAll();
      res.status(200).json(tourBookingss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneTourBookings(req, res) {
    try {
      const tourBookingss = await TourBookings.findByPk(req.params.id);
      res.status(200).json(tourBookingss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateTourBookings(req, res) {
    try {
      const updatedTourBookings = await TourBookings.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedTourBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteTourBookings(req, res) {
    try {
      const deletedTourBookings = await TourBookings.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedTourBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = TourBookingsController;
