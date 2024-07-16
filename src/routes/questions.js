const express = require("express");
const router = express.Router();
const Question = require("../controllers/questions");

router.get("/", Question.getAllQuestions);
router.get("/:id", Question.getOneQuestion);
router.post("/", Question.createQuestion);
router.put("/:id", Question.updateQuestion);
router.patch("/:id", Question.updateQuestion);
router.delete("/:id", Question.deleteQuestion);
module.exports = router;
