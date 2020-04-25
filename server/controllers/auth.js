const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const login = async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM user WHERE email='${email}'`;
  await db.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Server Error"
      });
    }
    try {
      if (result.length > 0) {
        const passCheck = await bcrypt.compare(password, result[0].password);
        if (passCheck) {
          const token = await jwt.sign({ email: email }, "supersecretkey", {
            expiresIn: "1h"
          });

          res.status(200).json({
            success: 1,
            token,
            name: result[0].name,
            email
          });
        } else {
          res.json({
            success: 0,
            message: "Incorrect Password"
          });
        }
      } else {
        res.json({
          success: 0,
          message: "Email Not Found"
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        message: "Server Error"
      });
    }
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const query = `SELECT * FROM user WHERE email='${email}'`;
  db.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        message: "Server Error"
      });
    }
    try {
      if (result.length > 0) {
        res.status(200).json({
          success: 0,
          message: "Email Already Exist. Please Login"
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO user (name, email, password) VALUES ('${name}','${email}','${hashPassword}')`;
        await db.query(query, async (err, result) => {
          if (err) {
            console.log(err);
            res.json({
              success: 0,
              message: "Server Error"
            });
          }
          console.log(result);

          const token = await jwt.sign({ email: email }, "supersecretkey", {
            expiresIn: "1h"
          });

          res.status(200).json({
            success: 1,
            token,
            name,
            email
          });
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        message: "Server Error"
      });
    }
  });
};

exports.login = login;
exports.register = register;
