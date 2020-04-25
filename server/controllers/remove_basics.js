const db = require("../database");

const removeExamQuestion = async (req, res, next) => {
  const { examid, questionid } = req.body;

  const query = `DELETE  FROM live_question WHERE examid=${examid} AND questionid=${questionid}`;

  await db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: "0"
      });
    } else {
      res.json({
        success: "1"
      });
    }
  });
};

exports.removeExamQuestion = removeExamQuestion;
