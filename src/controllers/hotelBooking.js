const models = require("../models/index");
const HotelBookings = models.HotelBookings;
const hotelBookingsController = {
  async createHotelBookings(req, res) {
    try {
      const newHotelBookings = await HotelBookings.create(req.body);
      res.status(201).json(newHotelBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllHotelBookingss(req, res) {
    try {
      const hotelBookingss = await HotelBookings.findAll();
      res.status(200).json(hotelBookingss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneHotelBookings(req, res) {
    try {
      const hotelBookingss = await HotelBookings.findByPk(req.params.id);
      res.status(200).json(hotelBookingss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneHotelBookingByUserId(req, res) {
    try {
      const hotelBookingss = await HotelBookings.findAll({
        where: { userId: req.params.userId },
      });
      res.status(200).json(hotelBookingss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateHotelBookings(req, res) {
    try {
      const updatedHotelBookings = await HotelBookings.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedHotelBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteHotelBookings(req, res) {
    try {
      const deletedHotelBookings = await HotelBookings.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedHotelBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = hotelBookingsController;
