const express = require("express");
const Router = express.Router();
const UpdateController = require("../controllers/update_basics");

Router.post("/examinfo", UpdateController.update_examinfo);

module.exports = Router;
