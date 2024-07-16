const models = require("../models/index");
const Favourite = models.Favourite;
const favouriteController = {
  async createFavourite(req, res) {
    try {
      const newFavourite = await Favourite.create(req.body);
      res.status(201).json(newFavourite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllFavourites(req, res) {
    try {
      const favourites = await Favourite.findAll();
      res.status(200).json(favourites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneFavourite(req, res) {
    try {
      const favourites = await Favourite.findByPk(req.params.id);
      res.status(200).json(favourites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateFavourite(req, res) {
    try {
      const updatedFavourite = await Favourite.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedFavourite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteFavourite(req, res) {
    try {
      const deletedFavourite = await Favourite.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedFavourite);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = favouriteController;
