const db = require("../database");

const update_examinfo = async (req, res, next) => {
  const { examid, isLive, showResult } = req.body;

  const query = `UPDATE curr_exam SET isLive='${isLive}', showResult='${showResult}' WHERE id='${examid}'`;

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

exports.update_examinfo = update_examinfo;
