const express = require("express");


const studentRoutes = require("./Routes/Student/Student.routes")
const QuestionRouter = require("./Routes/Exam/Question/Question.routes")

const app = express();

app.use(express.json({ extended: true }));

app.use("/v1/student", studentRoutes);
app.use("/v1/question", QuestionRouter)



module.exports = app;