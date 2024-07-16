const models = require("../models/index");
const { Op } = require("sequelize");
const Tour = models.Tour;
const tourService = require("../services/tourServices");

const tourController = {
  // async createTour(req, res) {
  //   try {
  //     const newTour = await Tour.create(req.body);
  //     res.status(201).json(newTour);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async createTour(req, res) {
    try {
      const tourData = {
        name: req.body.name,
        descriptionId: req.body.descriptionId,
        introId: req.body.introId,
        city: req.body.city,
        rating: req.body.rating,
        duration: req.body.duration,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        pricesAdult: req.body.pricesAdult,
        priceChild: req.body.priceChild,
        departureLocation: req.body.departureLocation,
        quantityTotalParticipate: req.body.quantityTotalParticipate,
        quantityRegistered: req.body.quantityRegistered,
        vehicle: req.body.vehicle,
        viewVisit: req.body.viewVisit,
      };

      const files = req.files; // Lấy files từ request
      const newTour = await tourService.createTour(tourData, files);

      res.status(201).json(newTour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(200).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneTour(req, res) {
    try {
      const tour = await Tour.findByPk(req.params.id);
      res.status(200).json(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getFilterTour(req, res) {
    try {
      const { name, city, duration, vehicle, startDate, priceChild } =
        req.query;
      const whereClause = {};
      if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
      }
      if (city) {
        whereClause.city = { [Op.like]: `%${city}%` };
      }

      if (duration) {
        whereClause.duration = { [Op.lte]: duration };
      }
      if (vehicle) {
        whereClause.vehicle = { [Op.like]: `%${vehicle}%` };
      }
      if (priceChild) {
        whereClause.priceChild = { [Op.lte]: priceChild };
      }

      if (startDate) {
        whereClause.startDate = { [Op.gte]: new Date(startDate) };
      }

      const tours = await Tour.findAll({ where: whereClause });
      res.json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // async updateTour(req, res) {
  //   try {
  //     const updatedTour = await Tour.update(req.body, {
  //       where: { id: req.params.id },
  //     });
  //     res.status(200).json(updatedTour);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async updateTour(req, res) {
    try {
      const tourData = {
        name: req.body.name,
        descriptionId: req.body.descriptionId,
        introId: req.body.introId,
        city: req.body.city,
        rating: req.body.rating,
        duration: req.body.duration,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        pricesAdult: req.body.pricesAdult,
        priceChild: req.body.priceChild,
        departureLocation: req.body.departureLocation,
        quantityTotalParticipate: req.body.quantityTotalParticipate,
        quantityRegistered: req.body.quantityRegistered,
        vehicle: req.body.vehicle,
        viewVisit: req.body.viewVisit,
      };

      const files = req.files; // Lấy files từ request
      await Tour.update(tourData, { where: { id: req.params.id } });

      // Upload new images if provided
      if (files && files.length > 0) {
        const imageUrls = await tourService.uploadFiles(files);
        // Cập nhật hình ảnh mới
        await Tour.update(
          { image: imageUrls },
          { where: { id: req.params.id } }
        );
      }

      res.status(200).json({ message: "Tour updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteTour(req, res) {
    try {
      const deletedTour = await Tour.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedTour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = tourController;
