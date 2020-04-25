const tinify = require("tinify");
tinify.key = "vNmQsDVDjYnmpXyp5QyKwQLjQBTX1Q2j";

const CompressImage = async (req, res, next) => {
  const files = req.files;
  for (var i = 0; i < files.length; i++) {
    await tinify.fromFile(files[i].path).toFile(files[i].path);
  }
  next();
};

module.exports = CompressImage;
