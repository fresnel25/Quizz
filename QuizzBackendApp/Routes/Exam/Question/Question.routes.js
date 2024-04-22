const express = require("express");
const { CreateQuestion, getQuestion, UpdateQuestion, getAllQuestion } = require("./Question.controllers");

const QuestionRouter = express.Router()

QuestionRouter.post("/register", CreateQuestion);
QuestionRouter.get("/", getAllQuestion);
QuestionRouter.put("/:id", UpdateQuestion);
QuestionRouter.get("/:id", getQuestion)

module.exports = QuestionRouter