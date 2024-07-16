const models = require("../models/index");
const QuestionAnswer = models.QuestionAnswer;
const questionAnswerController = {
  async createQuestionAnswer(req, res) {
    try {
      const newQuestionAnswer = await QuestionAnswer.create(req.body);
      res.status(201).json(newQuestionAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllQuestionAnswers(req, res) {
    try {
      const questionAnswerAll = await QuestionAnswer.findAll();
      res.status(200).json(questionAnswerAll);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneQuestionAnswer(req, res) {
    try {
      const questionAnswerOne = await QuestionAnswer.findByPk(req.params.id);
      res.status(200).json(questionAnswerOne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getQuestionAnswerByCategory(req, res) {
    try {
      const questionAnswerCategories = await QuestionAnswer.findAll({
        where: { categoriesQuestionId: req.params.categoriesQuestionId },
      });
      res.status(200).json(questionAnswerCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateQuestionAnswer(req, res) {
    try {
      const updatedQuestionAnswer = await QuestionAnswer.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedQuestionAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteQuestionAnswer(req, res) {
    try {
      const deletedQuestionAnswer = await QuestionAnswer.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedQuestionAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = questionAnswerController;
