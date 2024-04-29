const express = require("express");
const { CreateQuestion, getQuestion, UpdateQuestion, getAllQuestion } = require("./Question.controllers");

const QuestionRouter = express.Router()

QuestionRouter.post("/create", CreateQuestion);
QuestionRouter.get("/read", getAllQuestion);
QuestionRouter.get("/read:id", getQuestion)
QuestionRouter.put("/update:id", UpdateQuestion);

module.exports = QuestionRouter