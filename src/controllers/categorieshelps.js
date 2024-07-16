const models = require("../models/index");
const CategoriesHelps = models.CategoriesHelps;
const categoriesHelpsController = {
  async createCategoriesHelps(req, res) {
    try {
      const newCategoriesHelps = await CategoriesHelps.create(req.body);
      res.status(201).json(newCategoriesHelps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllCategoriesHelpss(req, res) {
    try {
      const categoriesQuestionAll = await CategoriesHelps.findAll();
      res.status(200).json(categoriesQuestionAll);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneCategoriesHelps(req, res) {
    try {
      const categoriesQuestionOne = await CategoriesHelps.findByPk(
        req.params.id
      );
      res.status(200).json(categoriesQuestionOne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateCategoriesHelps(req, res) {
    try {
      const updatedCategoriesHelps = await CategoriesHelps.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedCategoriesHelps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteCategoriesHelps(req, res) {
    try {
      const deletedCategoriesHelps = await CategoriesHelps.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedCategoriesHelps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = categoriesHelpsController;
