const express = require("express");
const { getAlltopic, gettopic, Createtopic, Updatetopic, Deletetopic } = require("./Topic.controllers");

const topicRouter = express.Router();

topicRouter.get("/read", getAlltopic)
topicRouter.get("/read:id", gettopic)
topicRouter.post("/create", Createtopic)
topicRouter.put("/update:id", Updatetopic)
topicRouter.delete("/delete:id", Deletetopic)

module.exports = topicRouter;