const express = require("express");
const GetBasics = require("../controllers/get_basics");
const Router = express.Router();
const authCheck = require("../middleware/auth");

Router.get("/class", GetBasics.getClass);
Router.get("/subject/:classid", GetBasics.getSubject);
Router.get("/chapter/:classid/:subjectid", GetBasics.getChapter);
Router.get("/examlist", GetBasics.getExam);
Router.get("/live-exam-list", GetBasics.getLiveExam);
Router.post("/fetch-question", GetBasics.getQuestion);
Router.post("/canUserAppear", GetBasics.canUserAppear);
Router.get("/try-question", GetBasics.tryGetQuestion);
Router.post("/exam-question", GetBasics.ExamQuestion);
Router.post("/get-examlist-by-user", GetBasics.getExamListByUser);
Router.post("/get-examlist-by-admin", authCheck, GetBasics.getExamListByAdmin);
Router.get("/get-examlist-by-admin-result", GetBasics.getExamListForResult);
Router.post("/result", GetBasics.getResult);
Router.post("/result-for-user", GetBasics.getResultUser);
Router.post("/questionById", GetBasics.getQuestionById);

module.exports = Router;
