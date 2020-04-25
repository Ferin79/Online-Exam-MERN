const db = require("../database");

const getClass = async (req, res, next) => {
  const query = `SELECT * FROM class`;
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Server Error",
      });
    }
    res.json({
      data: result,
    });
  });
};

const getSubject = async (req, res, next) => {
  const classId = req.params.classid;
  const query = `SELECT * FROM subject WHERE classid='${classId}'`;
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Fetching Subject Failed",
      });
    } else {
      res.json({
        success: 1,
        data: result,
      });
    }
  });
};

const getChapter = async (req, res, next) => {
  const classid = req.params.classid;
  const subjectid = req.params.subjectid;
  const query = `SELECT * FROM chapter WHERE classid='${classid}' AND subjectid='${subjectid}'`;
  await db.query(query, (err, result) => {
    if (err) {
      res.json({
        success: 0,
        message: "Server Error",
      });
    } else {
      res.json({
        success: 1,
        data: result,
      });
    }
  });
};

const getExam = async (req, res, next) => {
  const query = "SELECT * FROM curr_exam";
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};

const getLiveExam = async (req, res, next) => {
  const query = "SELECT * FROM curr_exam WHERE isLive='1'";
  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};
const getQuestion = async (req, res, next) => {
  const {
    classid,
    subjectid,
    chapterid,
    language,
    difficulty,
    count,
  } = req.body;

  const query = `SELECT * FROM questionmaster WHERE classid='${classid}' AND subjectid='${subjectid}' AND chapterid='${chapterid}' AND language='${language}' AND difficulty='${difficulty}' LIMIT ${count}`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};
const canUserAppear = async (req, res, next) => {
  const { email, examid } = req.body;

  const query = `SELECT * FROM user_appear WHERE email = '${email}' AND examid = '${examid}'`;
  console.log(query);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      if (result.length == 0) {
        console.log(result);
        res.json({
          success: "1",
        });
      } else {
        console.log(result);
        res.json({
          success: "0",
        });
      }
    }
  });
};

const tryGetQuestion = async (req, res, next) => {
  const query = "SELECT * FROM questionmaster";

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};

const ExamQuestion = async (req, res, next) => {
  const { examid } = req.body;

  var query = `SELECT * FROM live_question WHERE examid = '${examid}'`;
  await db.query(query, async (err, result) => {
    if (err) {
      res.json({
        success: "0",
      });
    } else {
      var question = [];
      for (let i = 0; i < result.length; i++) {
        var query = `SELECT * FROM questionmaster WHERE id = ${result[i].questionid}`;
        await db.query(query, (err, result1) => {
          if (err) {
            console.log(err.message);
          } else {
            question.push(...result1);
          }
          if (i + 1 === result.length) {
            console.log(i);
            console.log(result.length);
            res.json({
              success: "1",
              data: question,
            });
          }
        });
      }
    }
  });
};

const getExamListByUser = async (req, res, next) => {
  const { email } = req.body;
  const query = `SELECT * from curr_exam WHERE id IN (SELECT examid FROM user_appear WHERE email = '${email}') AND showResult = 1`;

  await db.query(query, (err, result) => {
    if (err) {
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};
const getExamListByAdmin = async (req, res, next) => {
  const { email } = req.body;

  const query = `SELECT * from curr_exam WHERE email = '${email}'`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};

const getExamListForResult = async (req, res, next) => {
  const query = `SELECT * FROM curr_exam WHERE showResult = 1`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};

const getResult = async (req, res, next) => {
  const { examid } = req.body;

  const query = `SELECT * FROM result WHERE examid = '${examid}'`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};
const getResultUser = async (req, res, next) => {
  const { email, examid } = req.body;

  const query = `SELECT * FROM result WHERE examid = '${examid}' AND email = '${email}'`;

  await db.query(query, async (err, result) => {
    const userResult = result;
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      console.log(result);
      const examid1 = result[0].examid;
      console.log(examid1);
      const query_live = `SELECT * FROM live_question WHERE examid = '${examid1}'`;
      console.log(query_live);
      db.query(query_live, (err, result_2) => {
        if (err) {
          console.log(err.message);
          res.json({
            success: 0,
          });
        } else {
          console.log(result_2);
          var question_arr = [];
          for (let i = 0; i < result_2.length; i++) {
            const query_sel = `SELECT * FROM questionmaster WHERE id = ${result_2[i].questionid}`;
            db.query(query_sel, (err, result_3) => {
              if (err) {
                console.log(err);
                res.json({
                  success: 0,
                });
              } else {
                question_arr.push(...result_3);
              }
              if (i + 1 === result_2.length) {
                console.log(question_arr);
                res.json({
                  success: 1,
                  data: question_arr,
                  result: userResult,
                });
              }
            });
          }
        }
      });
    }
  });
};

const getQuestionById = async (req, res, next) => {
  const { id } = req.body;

  const query = `SELECT * FROM questionmaster WHERE id = '${id}'`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0",
      });
    } else {
      res.json({
        success: "1",
        data: result,
      });
    }
  });
};
exports.getClass = getClass;
exports.getSubject = getSubject;
exports.getChapter = getChapter;
exports.getExam = getExam;
exports.getQuestion = getQuestion;
exports.getLiveExam = getLiveExam;
exports.canUserAppear = canUserAppear;
exports.tryGetQuestion = tryGetQuestion;
exports.ExamQuestion = ExamQuestion;
exports.getExamListByUser = getExamListByUser;
exports.getExamListByAdmin = getExamListByAdmin;
exports.getExamListForResult = getExamListForResult;
exports.getResult = getResult;
exports.getResultUser = getResultUser;
exports.getQuestionById = getQuestionById;
