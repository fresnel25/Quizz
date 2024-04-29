const express = require("express");


const studentRoutes = require("./Routes/Student/Student.routes")
const ExamRouter = require("./Routes/Exam/Exams/Exams.routes")
const topicRouter = require("./Routes/Exam/Topic/Topic.routes")
const QuestionRouter = require("./Routes/Exam/Question/Question.routes")
const AnswerRouter = require("./Routes/Exam/Answer/Answer.routes")

const app = express();

app.use(express.json({ extended: true }));

app.use("/v1/student", studentRoutes);
app.use("/v1/exam", ExamRouter);
app.use("/v1/topic", topicRouter);
app.use("/v1/question", QuestionRouter);
app.use("/v1/response", AnswerRouter);



module.exports = app;