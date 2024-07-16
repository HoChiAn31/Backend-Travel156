const models = require("../models/index");
const Promotion = models.Promotion;
const promotionController = {
  async createPromotion(req, res) {
    try {
      const newPromotion = await Promotion.create(req.body);
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllPromotions(req, res) {
    try {
      const promotions = await Promotion.findAll();
      res.status(200).json(promotions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOnePromotion(req, res) {
    try {
      const promotions = await Promotion.findByPk(req.params.id);
      res.status(200).json(promotions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updatePromotion(req, res) {
    try {
      const updatedPromotion = await Promotion.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedPromotion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deletePromotion(req, res) {
    try {
      const deletedPromotion = await Promotion.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedPromotion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async searchPromotion(req, res) {
    try {
      const { keyword } = req.query;
      const whereClause = {};
      console.log(keyword);
      if (keyword) {
        whereClause[Op.or] = [{ name: { [Op.like]: `%${keyword}%` } }];
      }

      const hotels = await Promotion.findAll({ where: whereClause });
      res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = promotionController;
