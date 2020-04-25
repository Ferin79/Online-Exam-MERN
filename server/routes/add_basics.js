const express = require("express");
const AddController = require("../controllers/add_basics");
const upload = require("../middleware/file-upload");
const authCheck = require("../middleware/auth");
const tinify = require("../middleware/tinify");

const Router = express.Router();

Router.post("/subject", AddController.addSubject);
Router.post("/chapter", AddController.addChapter);
Router.post("/exam", authCheck, AddController.addExam);
Router.post("/question", authCheck, upload.any(), AddController.addQuestion);
Router.post("/exam-question", authCheck, AddController.ExamQuestion);
Router.post("/user-appeared-for-exam", AddController.user_appeared_exam);
Router.post("/result", AddController.add_result);

module.exports = Router;
