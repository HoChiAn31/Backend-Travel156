const models = require("../models/index");
const Question = models.Questions;
const questionController = {
  async createQuestion(req, res) {
    try {
      const newQuestion = await Question.create(req.body);
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllQuestions(req, res) {
    try {
      const QuestionAll = await Question.findAll();
      res.status(200).json(QuestionAll);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneQuestion(req, res) {
    try {
      const QuestionOne = await Question.findByPk(req.params.id);
      res.status(200).json(QuestionOne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateQuestion(req, res) {
    try {
      const updatedQuestion = await Question.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteQuestion(req, res) {
    try {
      const deletedQuestion = await Question.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = questionController;
