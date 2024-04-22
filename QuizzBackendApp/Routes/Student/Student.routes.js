const express = require("express");
const { login, Register, getAllStudent, getSingleStudent } = require("./Student.controllers")
const studentRoutes = express.Router();

studentRoutes.post("/register", Register);
studentRoutes.post("/login", login);
studentRoutes.get("/", getAllStudent);
studentRoutes.get("/:id", getSingleStudent)

module.exports =  studentRoutes