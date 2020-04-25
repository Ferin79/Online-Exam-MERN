const db = require("../database");
const cloudinaryUploads = require("../middleware/cloudinary");
const fs = require("fs");

const addSubject = async (req, res, next) => {
  const { classId, subjectname } = req.body;

  const query = `INSERT INTO subject (classid, subjectname) VALUES ('${classId}','${subjectname}')`;
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Insert into Datbase Falied",
      });
    } else {
      res.json({
        success: 1,
      });
    }
  });
};

const addChapter = async (req, res, next) => {
  const { classid, subjectid, chaptername } = req.body;

  const query = `INSERT INTO chapter (classid, subjectid, chaptername) VALUES ('${classid}','${subjectid}','${chaptername}')`;
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Server Error",
      });
    } else {
      res.json({
        success: 1,
      });
    }
  });
};

const addQuestion = async (req, res, next) => {
  var i = 0;
  var questionFile = "";
  var optionAFile = "";
  var optionBFile = "";
  var optionCFile = "";
  var optionDFile = "";
  var solutionFile = "";
  const {
    email,
    classid,
    subjectid,
    chapterid,
    language,
    difficulty,
    isQuestionImage,
    questionText,
    isOptionImage,
    optionAText,
    optionBText,
    optionCText,
    optionDText,
    isSolutionImage,
    solutionText,
    correctAnswer,
    weightage,
  } = req.body;

  if (isQuestionImage === "1") {
    var path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "questions"
    );
    console.log(path);
    questionFile = path.url;
    //fs.unlinkSync(req.files[i].path);
    i++;
  }

  if (isOptionImage === "1") {
    var path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "options"
    );
    console.log(path);
    optionAFile = path.url;
    //fs.unlinkSync(req.files[i].path);
    i++;

    path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "options"
    );
    console.log(path);
    optionBFile = path.url;
    //fs.unlinkSync(req.files[i].path);
    i++;

    path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "options"
    );
    console.log(path);
    optionCFile = path.url;
    //fs.unlinkSync(req.files[i].path);
    i++;

    path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "options"
    );
    console.log(path);
    optionDFile = path.url;
    //fs.unlinkSync(req.files[i].path);
    i++;
  }
  if (isSolutionImage === "1") {
    const path = await cloudinaryUploads.cloudinary_uploads(
      req.files[i].path,
      "solutions"
    );
    console.log(path);
    solutionFile = path.url;
    //fs.unlinkSync(req.files[i].path);
  }

  const query = `INSERT INTO questionmaster (email,classid, subjectid, chapterid, language, difficulty, isQuestionImage, questionFile, questionText, isOptionImage, optionAFile, optionBFile, optionCFile, optionDFile, optionAText, optionBText, optionCText, optionDText, isSolutionImage, solutionFile, solutionText, correctAns, weightage) values ('${email}','${classid}','${subjectid}','${chapterid}','${language}','${difficulty}','${isQuestionImage}','${questionFile}','${questionText}','${isOptionImage}','${optionAFile}','${optionBFile}','${optionCFile}','${optionDFile}','${optionAText}','${optionBText}','${optionCText}','${optionDText}','${isSolutionImage}','${solutionFile}','${solutionText}','${correctAnswer}','${weightage}')`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
        message: "Database Insert Error",
      });
    }
    res.json({
      success: "1",
      result,
    });
  });
};

const addExam = async (req, res, next) => {
  const { examName, examDuration, examDesc, email } = req.body;

  const query = `INSERT INTO curr_exam (email, exam_name, exam_duration, instruction, isLive, showResult) VALUES ('${email}','${examName}','${examDuration}','${examDesc}','0','0')`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
        message: "Insert Error",
      });
    } else {
      res.json({
        success: "1",
      });
    }
  });
};

const ExamQuestion = async (req, res, next) => {
  const { examid, questionid } = req.body;

  const query = `INSERT INTO live_question (examid, questionid) VALUES ('${examid}','${questionid}')`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
      });
    }
  });
};

const user_appeared_exam = async (req, res, next) => {
  const { email, examid } = req.body;

  const query = `INSERT INTO user_appear (examid, email) VALUES ('${examid}','${email}')`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
      });
    }
  });
};

const add_result = async (req, res, next) => {
  const {
    correctAns,
    correctAnsArray,
    wrongAns,
    wrongAnsArray,
    notAttemted,
    notAttemptedArray,
    marks,
    examid,
    userEmail,
    uid,
    totalMarks,
  } = req.body;

  var correctAnsString = JSON.stringify(correctAnsArray);
  var wrongAnsString = JSON.stringify(wrongAnsArray);
  var notAttemptedString = JSON.stringify(notAttemptedArray);

  const query = `INSERT INTO result (examid, uid, email, correctAns, correctAnsArr, wrongAns, wrongAnsArr, notAttemted, notAttemtedArr, marks, totalMarks) VALUES ('${examid}','${uid}','${userEmail}','${correctAns}','${correctAnsString}','${wrongAns}','${wrongAnsString}','${notAttemted}','${notAttemptedString}','${marks}','${totalMarks}')`;

  try {
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.json({
          success: "0",
        });
      } else {
        res.json({
          success: "1",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addSubject = addSubject;
exports.addChapter = addChapter;
exports.addQuestion = addQuestion;
exports.addExam = addExam;
exports.ExamQuestion = ExamQuestion;
exports.user_appeared_exam = user_appeared_exam;
exports.add_result = add_result;
