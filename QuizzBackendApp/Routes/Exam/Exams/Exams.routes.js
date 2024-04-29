const express = require("express");
const { getAllExam, getExam, CreateExam, UpdateExam, DeleteExam } = require("./Exams.controllers");

const ExamRouter = express.Router();

ExamRouter.get("/read", getAllExam)
ExamRouter.get("/read:id", getExam)
ExamRouter.post("/create", CreateExam)
ExamRouter.put("/update:id", UpdateExam)
ExamRouter.delete("/delete:id", DeleteExam)

module.exports = ExamRouter;