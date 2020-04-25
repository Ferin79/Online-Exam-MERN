const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
