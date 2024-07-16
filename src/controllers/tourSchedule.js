const models = require("../models/index");
const TourSchedule = models.TourSchedule;
const tourScheduleService = require("../services/tourScheduleService");
const tourScheduleController = {
  // async createTourSchedule(req, res) {
  //   try {
  //     const newTourSchedule = await TourSchedule.create(req.body);
  //     res.status(201).json(newTourSchedule);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async createTourSchedule(req, res) {
    try {
      const tourData = {
        city: req.body.city,
        description: JSON.parse(req.body.description), // Giả sử bạn nhận description từ body
      };

      const files = req.files; // Lấy files từ request
      const newTourSchedule = await tourScheduleService.createTourSchedule(
        tourData,
        files
      );

      res.status(201).json(newTourSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllTourSchedules(req, res) {
    try {
      const tourSchedules = await TourSchedule.findAll();
      res.status(200).json(tourSchedules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneTourSchedule(req, res) {
    try {
      const tourSchedules = await TourSchedule.findByPk(req.params.id);
      res.status(200).json(tourSchedules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // async updateTourSchedule(req, res) {
  //   try {
  //     const updatedTourSchedule = await TourSchedule.update(req.body, {
  //       where: { id: req.params.id },
  //     });
  //     res.status(200).json(updatedTourSchedule);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async updateTourSchedule(req, res) {
    try {
      const tourData = {
        city: req.body.city,
        description: JSON.parse(req.body.description), // Giả sử bạn nhận description từ body
      };

      const files = req.files; // Lấy files từ request nếu có
      const updatedTourSchedule = await tourScheduleService.updateTourSchedule(
        req.params.id,
        tourData,
        files
      );

      if (updatedTourSchedule[0] === 0) {
        return res.status(404).json({ message: "Tour schedule not found" });
      }

      res.status(200).json({ message: "Tour schedule updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteTourSchedule(req, res) {
    try {
      const deletedTourSchedule = await TourSchedule.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedTourSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = tourScheduleController;
