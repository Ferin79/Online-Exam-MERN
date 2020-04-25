const express = require("express");
const RemoveBasics = require("../controllers/remove_basics");
const Router = express.Router();

Router.post("/exam-question", RemoveBasics.removeExamQuestion);

module.exports = Router;
