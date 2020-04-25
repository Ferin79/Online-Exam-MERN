const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.json({
        success: "0",
        message: "Authentication Failed"
      });
    } else {
      const decoded = jwt.verify(token, "supersecretkey");
      next();
    }
  } catch (error) {
    res.json({
      success: "0",
      message: "Auth Failed"
    });
    console.log(error);
  }
};
