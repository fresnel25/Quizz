const express = require("express")
const { getAllResponse, getResponse, CreateResponse, UpdateResponse, DeleteResponse } = require("./Answer.controllers")

const AnswerRouter = express.Router()

AnswerRouter.get("/read", getAllResponse)
AnswerRouter.get("/read:id", getResponse)
AnswerRouter.post("/create", CreateResponse)
AnswerRouter.put("/update:id", UpdateResponse),
AnswerRouter.delete("/delete:id", DeleteResponse)

module.exports = AnswerRouter