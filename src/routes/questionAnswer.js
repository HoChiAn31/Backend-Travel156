const express = require("express");
const router = express.Router();
const QuestionAnswer = require("../controllers/questionAnswer");

router.get("/", QuestionAnswer.getAllQuestionAnswers);
router.get("/:id", QuestionAnswer.getOneQuestionAnswer);
router.get(
  "/categoriesQuestionId/:categoriesQuestionId",
  QuestionAnswer.getQuestionAnswerByCategory
);
router.post("/", QuestionAnswer.createQuestionAnswer);
router.put("/:id", QuestionAnswer.updateQuestionAnswer);
router.patch("/:id", QuestionAnswer.updateQuestionAnswer);
router.delete("/:id", QuestionAnswer.deleteQuestionAnswer);
module.exports = router;
